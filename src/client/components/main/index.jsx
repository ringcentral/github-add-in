import { useState, useEffect, useRef } from 'react'
import eventTypes from '../../common/github-events'
import Entry from './entry'
import NewWebhook from './new-webhook'
import fetchUser from '../../common/get-user'
import { Spin, Modal, notification } from 'antd'
import { getOrgs, getRepos, createGhWebhook, delGhWebhook } from './gh-apis'
import { listDbWebhook, createDbWebhook, updateDbWebhook, delDbWebhook } from './db-apis'
import copy from 'json-deep-copy'
import { PostMessageApp } from '../../external/rc-postmessage'
import logoutFunc from '../../common/logout'
import { MESSAGE_CHANNEL } from '../../common/constants'
import wait from '../../common/wait'
import './options.styl'

export default function Options () {
  const ref = useRef(null)
  const [state, setStateOrg] = useState({
    loadingUser: false,
    orgs: [],
    repos: [],
    eventTypes: eventTypes(),
    selectedEvents: [],
    webhooks: [],
    user: {},
    step: 0,
    currentOrg: null,
    currentRepo: null,
    showList: false,
    submitting: false,
    loadingOrgs: false,
    loadingRepos: false,
    loadingWebhooks: false,
    filterWebhook: 'current'
  })
  function setState (update) {
    setStateOrg(old => {
      return {
        ...old,
        ...update
      }
    })
  }
  function getFrameName () {
    const arr = window.location.href.match(/frameName=([\w-_\d]+)/)
    return arr
      ? arr[1]
      : ''
  }
  async function logout (e) {
    e.preventDefault()
    setState({
      loadingUser: true,
      user: {}
    })
    await logoutFunc()
    setState({
      loadingUser: false
    })
  }
  function onAuthCallack (e) {
    console.log(e)
    if (e && e.data && e.data.authDone) {
      fetchUserInfo()
    }
    window.removeEventListener('message', onAuthCallack)
  }
  function onAuth () {
    const url = window.rc.authUrlDefault.replace(
      window.rc.defaultState,
      encodeURIComponent(window.rc.query.webhook)
    )
    window.open(url, getFrameName())
    window.addEventListener('message', onAuthCallack)
  }
  async function fetchWebhooks (firstTime) {
    setState({
      loadingWebhook: true
    })
    const arr = await listDbWebhook()
    const up = {
      loadingWebhook: false
    }
    if (arr) {
      up.webhooks = arr
    }
    setState(up)
    if (firstTime) {
      checkMatchedWebhook(arr)
    }
  }

  async function checkMatchedWebhook (webhooks) {
    await wait(100)
    const wh = window.rc.query.webhook
    const hasCurrentWh = webhooks.find(d => {
      return d.rc_webhook === wh
    })
    if (hasCurrentWh) {
      setState({
        filterWebhook: 'current',
        showList: true
      })
    }
  }

  function handleSwitchFilter (e) {
    setState({
      filterWebhook: e.target.value
    })
  }

  async function fetchUserInfo () {
    setState({
      loadingUser: true
    })
    const user = await fetchUser()
    const update = {
      loadingUser: false
    }
    if (user) {
      window.rc.user = user.result
      update.user = user.result
      fetchWebhooks(true)
      fetchOrgs()
    }
    setState(update)
  }
  async function fetchOrgs () {
    setState({
      loadingOrgs: true
    })
    const orgs = await getOrgs()
    const update = {
      loadingOrgs: false
    }
    setStateOrg(old => {
      if (orgs) {
        update.orgs = [
          old.user.gh_user_info,
          ...orgs
        ]
      }
      return {
        ...old,
        ...update
      }
    })
  }
  async function fetchRepos (org = state.currentOrg, isUser) {
    setState({
      loadingRepos: true
    })
    const repos = await getRepos(org.login, isUser)
    const update = {
      loadingRepos: false
    }
    if (repos) {
      update.repos = repos
    }
    setState(update)
  }
  function onClickOrg (org) {
    const isUser = org.login === window.rc.user.gh_user_info.login
    fetchRepos(org, isUser)
    setState({
      currentRepo: null,
      step: 1,
      currentOrg: org
    })
  }
  async function submit () {
    const events = state.selectedEvents
    if (!events.length) {
      return null
    }
    setState({
      submitting: true
    })
    const wh = await createDbWebhook({
      ghWebhookId: '',
      rcWebhook: window.rc.query.webhook,
      user: state.user.gh_user_info,
      org: state.currentOrg,
      repo: state.currentRepo,
      events
    })
    const { id } = wh
    const orgId = state.currentOrg.login
    const repoId = state.currentRepo.name
    const url = window.rc.server + '/gh/webhook/' + id
    const wh1 = await createGhWebhook(
      orgId,
      repoId,
      url,
      events
    )
    if (!wh1) {
      setState({
        submitting: false
      })
      notification.error({
        message: 'Create webhook failed',
        description: 'You may not have permission to create webhook in the repo'
      })
      await delDbWebhook(id)
      return {
        status: true
      }
    }
    const up = {
      gh_webhook_id: '' + wh1.id
    }
    await updateDbWebhook({
      id,
      update: up
    })
    setStateOrg(old => {
      const arr = copy(old.webhooks)
      arr.push({
        ...wh,
        ...up
      })
      return {
        ...old,
        webhooks: arr,
        submitting: false,
        selectedEvents: []
      }
    })
    Modal.success({
      content: 'Done! Webhook created'
    })
    return {
      status: true
    }
  }
  function onClickRepo (repo) {
    setState({
      currentRepo: repo,
      step: 2
    })
  }
  function onStepChange (step) {
    const currentStep = state.step
    if (step >= currentStep) {
      return null
    }
    if (step !== 2) {
      nofitfyCanSubmit(false)
    }
    if (step === 0) {
      setState({
        step,
        currentRepo: null,
        repos: [],
        currentOrg: null
      })
    } else if (step === 1) {
      setState({
        step,
        currentRepo: null
      })
    }
  }
  async function delWebhook (wh) {
    setState({
      submitting: true
    })
    if (wh.gh_webhook_id) {
      await delGhWebhook(
        wh.gh_org.login,
        wh.gh_repo.name,
        wh.gh_webhook_id
      )
    }
    await delDbWebhook(wh.id)
    setStateOrg(old => {
      const arr = copy(old.webhooks)
        .filter(d => d.id !== wh.id)
      return {
        ...old,
        submitting: false,
        webhooks: arr
      }
    })
  }
  function switchWebhookList (showList) {
    setState({
      showList
    })
  }
  function nofitfyCanSubmit (status) {
    ref.current.send(MESSAGE_CHANNEL.oauth, { status })
  }
  function onSelectEvent (event) {
    setStateOrg(old => {
      const { id } = event
      let arr = copy(state.selectedEvents)
      if (arr.includes(id)) {
        arr = arr.filter(d => d !== id)
      } else {
        arr = [
          ...arr,
          id
        ]
      }
      nofitfyCanSubmit(arr.length > 0 && state.step === 2)
      return {
        ...old,
        selectedEvents: arr
      }
    })
  }
  function handleEvent () {
    if (ref.current) {
      ref.current.dispose()
    }
    ref.current = new PostMessageApp()
    ref.current.handle(MESSAGE_CHANNEL.submitted, submit)
  }
  useEffect(() => {
    // window.addEventListener('message', e => {
    //   console.log('inside evet', e.data)
    // })
    fetchUserInfo()
  }, [])
  useEffect(() => {
    handleEvent()
  }, [state.selectedEvents, state.user, state.currentOrg, state.currentRepo])
  const loading = state.loadingOrgs || state.loadingRepos || state.loadingWebhooks || state.submitting || state.loadingUser
  const funcs = {
    fetchWebhooks,
    fetchOrgs,
    fetchRepos,
    onClickOrg,
    submit,
    onClickRepo,
    onStepChange,
    onSelectEvent,
    switchWebhookList,
    delWebhook,
    handleSwitchFilter,
    logout
  }
  if (state.user.id) {
    return (
      <Spin spinning={loading}>
        <NewWebhook
          {...state}
          {...funcs}
          loading={loading}
        />
      </Spin>
    )
  }
  const authUrl = window.rc.authUrlDefault.replace(
    window.rc.defaultState,
    encodeURIComponent(window.rc.query.webhook)
  )
  return (
    <Entry
      authUrl={authUrl}
      loadingUser={state.loadingUser}
      onAuth={onAuth}
    />
  )
}
