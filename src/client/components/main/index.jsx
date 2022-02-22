import { Component } from 'react'
import eventTypes from '../../../server/app/common/github-events'
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

export default class Options extends Component {
  state = {
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
  }

  ref = null

  componentDidMount () {
    this.handleEvent()
    if (window.rc.query.action !== 'auth') {
      this.fetchUserInfo()
    }
  }

  track = (eventName) => {
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
  logout = async (e) => {
    e.preventDefault()
    this.setState({
      loadingUser: true,
      user: {}
    })
    await logoutFunc()
    this.setState({
      loadingUser: false
    })
  }

  onAuthCallack = (e) => {
    if (e && e.data && e.data.authDone) {
      this.fetchUserInfo()
    }
    window.removeEventListener('message', this.onAuthCallack)
  }

  getAuthUrl = () => {
    const url = window.rc.authUrlDefault.replace(
      window.rc.defaultState,
      encodeURIComponent(window.rc.query.webhook)
    )
    return url
  }

  handleAuth = () => {
    const url = this.getAuthUrl()
    this.ref.openWindow(url)
    window.addEventListener('message', this.onAuthCallack)
  }

  fetchWebhooks = async (firstTime) => {
    this.setState({
      loadingWebhooks: true
    })
    const arr = await listDbWebhook()
    const up = {
      loadingWebhooks: false
    }
    if (arr) {
      up.webhooks = arr
    }
    this.setState(up)
    if (firstTime) {
      this.checkMatchedWebhook(arr)
    }
  }

  updateWebhook = async (wh, events) => {
    this.setState({
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
    this.setState(up)
    await this.fetchWebhooks()
  }

  checkMatchedWebhook = async (webhooks) => {
    await wait(100)
    const wh = window.rc.query.webhook
    const hasCurrentWh = webhooks.find(d => {
      return d.rc_webhook === wh || getWebhookId(d.rc_webhook) === getWebhookId(wh)
    })
    if (hasCurrentWh) {
      this.setState({
        filterWebhook: 'current',
        showList: true
      })
    }
  }

  handleSwitchFilter = (e) => {
    this.setState({
      filterWebhook: e.target.value
    })
  }

  isUserAuthed = (user) => {
    return user && user.result && user.result.id
  }

  redirectUrl = () => {
    return window.location.href.replace('=auth', '')
  }

  fetchUserInfo = async () => {
    this.setState({
      loadingUser: true
    })
    const user = await fetchUser()
    const update = {
      loadingUser: false
    }
    if (this.isUserAuthed(user)) {
      window.rc.user = user.result
      update.user = user.result
      this.fetchWebhooks(true)
      this.fetchOrgs()
      if (window.rc.query.action === 'auth') {
        const cont = (
          <div>
            <p>Now you can go back to RingCentral App, use bot command to create GitHub webhooks</p>
            <p>
              <span>Or</span>
              <a
                href={this.redirectUrl()}
                className='mg1l'
              >
                create webhook from webpage
              </a>
            </p>
          </div>
        )
        Modal.info({
          title: 'Authorized',
          content: cont
        })
      }
    }
    this.setState(update)
  }

  fetchOrgs = async () => {
    this.setState({
      loadingOrgs: true
    })
    const orgs = await getOrgs()
    const update = {
      loadingOrgs: false
    }
    this.setState(old => {
      if (orgs) {
        update.orgs = [
          old.user.gh_user_info,
          ...orgs
        ]
      }
      return update
    })
  }

  fetchRepos = async (org = this.state.currentOrg, isUser) => {
    this.setState({
      loadingRepos: true
    })
    const repos = await getRepos(org.login, isUser)
    const update = {
      loadingRepos: false
    }
    if (repos) {
      update.repos = repos
    }
    this.setState(update)
  }

  onClickOrg = (org) => {
    const isUser = org.login === window.rc.user.gh_user_info.login
    this.fetchRepos(org, isUser)
    this.setState({
      currentRepo: null,
      step: 1,
      currentOrg: org
    })
  }

  submit = async () => {
    const events = this.state.selectedEvents
    if (!events.length) {
      return null
    }
    this.setState({
      submitting: true
    })
    const propsArr = ['id', 'login', 'avatar_url', 'html_url']
    const wh = await createDbWebhook({
      ghWebhookId: 'none',
      rcWebhook: window.rc.query.webhook,
      user: _.pick(
        this.state.user.gh_user_info,
        propsArr
      ),
      org: _.pick(
        this.state.currentOrg,
        propsArr
      ),
      repo: _.pick(
        this.state.currentRepo,
        ['id', 'full_name', 'name', 'html_url', 'login']
      ),
      events
    })
    const { id } = wh
    const orgId = this.state.currentOrg.login
    const repoId = this.state.currentRepo.name
    const mid = window.rc.isBot
      ? 'gh-bot'
      : 'gh'
    const url = window.rc.server + `/${mid}/webhook/` + id
    // console.log('url', url)
    // console.log('state', state)
    const wh1 = await createGhWebhook(
      orgId,
      repoId,
      url,
      events,
      this.state.beta
    )
    if (!wh1) {
      this.setState({
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
    this.setState(old => {
      const arr = copy(old.webhooks)
      arr.push({
        ...wh,
        ...up
      })
      return {
        webhooks: arr,
        submitting: false,
        selectedEvents: []
      }
    })
    Modal.success({
      content: 'Done! Webhook created'
    })
    this.track('GitHub Webhook created')
    return {
      status: true
    }
  }

  onClickRepo = (repo) => {
    this.setState({
      currentRepo: repo,
      step: 2
    })
  }

  onStepChange = (step) => {
    const currentStep = this.state.step
    if (step >= currentStep) {
      return null
    }
    if (step !== 2) {
      this.nofitfyCanSubmit(false)
    }
    if (step === 0) {
      this.setState({
        step,
        currentRepo: null,
        repos: [],
        currentOrg: null
      })
    } else if (step === 1) {
      this.setState({
        step,
        currentRepo: null
      })
    }
  }

  showEditWebhook = (wh) => {
    this.setState({
      webhookEdit: wh
    })
  }

  hideEditWebhook = () => {
    this.setState({
      webhookEdit: null
    })
  }

  delWebhook = async (wh) => {
    this.setState({
      submitting: true
    })
    if (wh.gh_webhook_id) {
      await delGhWebhook(
        wh.gh_org.login,
        wh.gh_repo.name || wh.gh_repo.login,
        wh.gh_webhook_id
      )
    }
    await delDbWebhook(wh.id)
    this.setState(old => {
      const arr = copy(old.webhooks)
        .filter(d => d.id !== wh.id)
      return {
        submitting: false,
        webhooks: arr
      }
    })
  }

  switchWebhookList = (showList) => {
    this.setState({
      showList
    })
  }

  nofitfyCanSubmit = (status) => {
    this.ref.send({ canSubmit: status })
  }

  onSelectEvent = (event) => {
    this.setState(old => {
      const { id } = event
      let arr = copy(this.state.selectedEvents)
      if (arr.includes(id)) {
        arr = arr.filter(d => d !== id)
      } else {
        arr = [
          ...arr,
          id
        ]
      }
      this.nofitfyCanSubmit(arr.length > 0 && this.state.step === 2)
      return {
        selectedEvents: arr
      }
    })
  }

  handleEvent = () => {
    if (this.ref) {
      this.ref.dispose()
    }
    this.ref = new RingCentralNotificationIntegrationHelper()
    this.ref.on('submit', this.submit)
  }

  isAuthed = () => {
    if (window.rc.query.action === 'auth') {
      return false
    }
    const {
      id
    } = this.state.user || {}
    return !!id
  }

  render () {
    const { state } = this
    const loading = state.loadingOrgs || state.loadingRepos || state.loadingWebhooks || state.submitting || state.loadingUser
    const funcs = _.pick(this, [
      'fetchWebhooks',
      'fetchOrgs',
      'fetchRepos',
      'onClickOrg',
      'submit',
      'onClickRepo',
      'onStepChange',
      'onSelectEvent',
      'showEditWebhook',
      'hideEditWebhook',
      'updateWebhook',
      'switchWebhookList',
      'delWebhook',
      'handleSwitchFilter',
      'logout'
    ])
    if (this.isAuthed()) {
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
    const authUrl = this.getAuthUrl()
    return (
      <Entry
        authUrl={authUrl}
        loadingUser={state.loadingUser}
        onAuth={this.handleAuth}
      />
    )
  }
}
