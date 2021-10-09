
import { RCGH } from '../models/rc-gh'
import { Token } from '../models/token'
import { User } from '../models/gh'
import { Webhook } from '../models/webhook'
import { authTempRender, messageTempRender } from '../handlers/templates'
// import { nanoid as generate } from 'nanoid'
import parser from '../handlers/string-parser'
import {
  authUrlDefault,
  defaultState
} from '../common/constants'
import { postMessage } from '../handlers/webhook'

const states = {
  open: 'open',
  closed: 'closed'
}

const types = {
  issues: 'issues',
  pulls: 'issues'
}

function getId (user) {
  const {
    id,
    accountId
  } = user
  return `${accountId}-${id}`
}

async function sendAuthMessage (body) {
  const {
    user,
    data
  } = body
  const {
    whId,
    actionTitle
  } = data
  const uid = getId(user)
  const inst = await Webhook.findByPk(whId)
  const url = inst.rc_webhook
  const authUrl = authUrlDefault
    .replace(defaultState, 'token-auth')
    .replace(/ /g, encodeURIComponent(' '))
  const title = parser(`This "${actionTitle}" action requires authorization, please ***[click to authorize](${authUrl})***, after authorization you will get a token, paste here and submit, then you can click the "${actionTitle}" button again.`)
  const str = authTempRender({
    title,
    data: parser({
      action: 'auth',
      whId,
      uid
    })
  })
  const r = {
    attachments: [
      JSON.parse(str)
    ]
  }
  await postMessage(url, r)
}

function expired (inst) {
  const now = Date.now()
  const max = 5 * 60 * 1000
  const d = new Date(inst.updatedAt).getTime()
  return now - d > max
}

async function auth (data, user) {
  const { token } = data
  if (!token) {
    return {
      status: 400,
      message: 'token required'
    }
  }
  const inst = await Token.findByPk(token)
  if (!inst) {
    return {
      status: 404,
      message: 'token no match'
    }
  } else if (expired(inst)) {
    await await Token.destroy({
      where: {
        id: inst.id
      }
    })
    return {
      status: 400,
      message: 'token expired'
    }
  }
  const id = getId(user)
  await RCGH.create({
    id,
    gh_id: inst.gh_id
  })
  await Token.destroy({
    where: {
      id: inst.id
    }
  })
  const wh = await Webhook.findByPk(data.whId)
  const url = wh.rc_webhook
  // const name = `${data.firstName || ''} ${data.lastName || ''}`
  const msg = messageTempRender({
    title: 'Your authorization done, you can click the button again now'
  })
  const r = {
    attachments: [
      JSON.parse(msg)
    ]
  }
  await postMessage(url, r)
  return {
    status: 200,
    message: 'ok'
  }
}

/**
 * update issues or pr
 * @param {*} user
 * @param {object} config
 * @param {string} type pulls or issues
 * @param {string} state  open or closed
 * @returns null
 */
async function updateIssueOrPr (user, config, type, state) {
  const url = `/repos/${config.owner}/${config.repo}/${type}/${config.n}`
  return user.gh.request({
    data: {
      state
    },
    method: 'patch',
    url
  })
    .then(d => d.data)
    .catch(err => {
      console.error(`set ${type} ${state} error`, err)
    })
}

function addComment (user, config, type = 'issues') {
  const url = `/repos/${config.owner}/${config.repo}/issues/${config.n}/comments`
  return user.gh.request({
    data: {
      body: config.githubCommentInput1 || config.githubCommentInput2 || config.commentInput
    },
    method: 'post',
    url
  })
    .then(d => d.data)
    .catch(err => {
      console.error(`comment on ${config.owner}/${config.repo}/${type}/${config.n} error`, err)
    })
}

async function ghAction (user, body) {
  const {
    data
  } = body
  const { action } = data
  if (action === 'close-issue') {
    await updateIssueOrPr(user, data, types.issues, states.closed)
  } else if (action === 'close-pr') {
    await updateIssueOrPr(user, data, types.pulls, states.closed)
  } else if (action === 'reopen-issue') {
    await updateIssueOrPr(user, data, types.issues, states.open)
  } else if (action === 'reopen-pr') {
    await updateIssueOrPr(user, data, types.pulls, states.open)
  } else if (action === 'add-comment') {
    await addComment(user, data, types.issues)
  } else if (action === 'add-comment-pr') {
    await addComment(user, data, types.pulls)
  }
}

async function action (req, res) {
  // console.log('==========')
  // console.log(req.body)
  // console.log('==========')
  const {
    user,
    data
  } = req.body
  if (!user || !data) {
    res.status(400).send('not ok')
    return false
  }
  const rcId = getId(user)
  if (data.action === 'auth') {
    const d = await auth(data, user)
    return res.send(d.message)
  }
  const inst = await RCGH.findByPk(rcId)
  if (!inst) {
    await sendAuthMessage(req.body)
    return res.status(200).send('not exist')
  }
  // if (!inst.verified) {
  //   await sendAuthMessage(req.body)
  //   return res.send('not authed')
  // }
  const u = await User.findByPk(inst.gh_id)
  await ghAction(u, req.body)
  res.send('ok')
}

export default (app) => {
  app.post('/rc/action', action)
}
