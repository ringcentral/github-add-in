import { useState, useEffect, useRef } from 'react'
import eventTypes from '../../common/github-events'
import Entry from './entry'
import NewWebhook from './new-webhook'
import fetchUser from '../../common/get-user'
import { Spin, Modal, notification } from 'antd'
import { getOrgs, getRepos, createGhWebhook, delGhWebhook, updateGhWebhook } from './gh-apis'
import { listDbWebhook, createDbWebhook, updateDbWebhook, delDbWebhook } from './db-apis'
import copy from 'json-deep-copy'
import { RingCentralNotificationIntegrationHelper } from 'ringcentral-notification-integration-helper'
import logoutFunc from '../../common/logout'
import wait from '../../common/wait'
import _ from 'lodash'
import './options.styl'

function getWebhookId (url) {
  const arr = url.split('/')
  const len = arr.length
  return arr[len - 1]
}

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
    filterWebhook: 'current',
    beta: false,
    webhookEdit: null
  })
  function setState (update) {
    setStateOrg(old => {
      return {
        ...old,
        ...update
      }
    })
  }
  function track (eventName) {
    const segmentOptions = {
      integrations: {
        All: true,
        Mixpanel: true
      }
    }
    window.analytics.track(eventName, {
      appName: window.rc.appName,
      appVersion: window.rc.version
      // brand: ''
      // 'App Language': string;
      // 'Browser Language': string;
      // 'Extension Type': string;
    }, segmentOptions)
  }
  // function getFrameName () {
  //   const arr = window.location.href.match(/frameName=([\w-_\d]+)/)
  //   return arr
  //     ? arr[1]
  //     : ''
  // }
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
    ref.current.openWindow(url)
    window.addEventListener('message', onAuthCallack)
  }
  async function fetchWebhooks (firstTime) {
    setState({
      loadingWebhooks: true
    })
    const arr = await listDbWebhook()
    const up = {
      loadingWebhooks: false
    }
    if (arr) {
      up.webhooks = arr
    }
    setState(up)
    if (firstTime) {
      checkMatchedWebhook(arr)
    }
  }
  async function updateWebhook (wh, events) {
    setState({
      webhookEdit: null,
      loadingWebhooks: true
    })
    const up = {
      loadingWebhooks: false
    }
    const a = await updateDbWebhook({
      id: wh.id,
      update: {
        gh_events: events.join(',')
      }
    })
    if (a) {
      await updateGhWebhook(wh.gh_org.login, wh.gh_repo.name, wh.gh_webhook_id, events)
    }
    setState(up)
    await fetchWebhooks()
  }

  async function checkMatchedWebhook (webhooks) {
    await wait(100)
    const wh = window.rc.query.webhook
    const hasCurrentWh = webhooks.find(d => {
      return d.rc_webhook === wh || getWebhookId(d.rc_webhook) === getWebhookId(wh)
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
    const propsArr = ['id', 'login', 'avatar_url', 'html_url']
    const wh = await createDbWebhook({
      ghWebhookId: 'none',
      rcWebhook: window.rc.query.webhook,
      user: _.pick(
        state.user.gh_user_info,
        propsArr
      ),
      org: _.pick(
        state.currentOrg,
        propsArr
      ),
      repo: _.pick(
        state.currentRepo,
        ['id', 'full_name', 'name', 'html_url']
      ),
      events
    })
    const { id } = wh
    const orgId = state.currentOrg.login
    const repoId = state.currentRepo.name
    const str = state.beta ? 'v2/' : ''
    const url = window.rc.server + `/gh/webhook/${str}` + id
    console.log('url', url)
    console.log('state', state)
    const wh1 = await createGhWebhook(
      orgId,
      repoId,
      url,
      events,
      state.beta
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
        status: false
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
    track('GitHub Webhook created')
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
  function showEditWebhook (wh) {
    setState({
      webhookEdit: wh
    })
  }
  function hideEditWebhook () {
    setState({
      webhookEdit: null
    })
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
    ref.current.send({ canSubmit: status })
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
    ref.current = new RingCentralNotificationIntegrationHelper()
    ref.current.on('submit', submit)
  }
  useEffect(() => {
    // window.addEventListener('message', e => {
    //   console.log('inside evet', e.data)
    // })
    fetchUserInfo()
  }, [])
  useEffect(() => {
    handleEvent()
  }, [
    state.selectedEvents,
    state.user,
    state.currentOrg,
    state.currentRepo,
    state.beta
  ])
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
    showEditWebhook,
    hideEditWebhook,
    updateWebhook,
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
