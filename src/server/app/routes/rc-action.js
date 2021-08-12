
import { RCGH } from '../models/rc-gh'
import { User } from '../models/gh'
import { Webhook } from '../models/webhook'
import { authTempRender, messageTempRender } from '../handlers/templates'
import { generate } from 'shortid'
import parser from '../handlers/string-parser'
import {
  authUrlDefault,
  defaultState
} from '../common/constants'
import { postMessage } from '../handlers/webhook'

async function sendAuthMessage (body) {
  const {
    user,
    data
  } = body
  const {
    whId,
    actionTitle
  } = data
  const {
    id,
    accountId
  } = user
  const uid = `${accountId}-${id}`
  const inst = await Webhook.findByPk(whId)
  const url = inst.rc_webhook
  const authUrl = authUrlDefault
    .replace(defaultState, `uid:${uid}`)
    .replace(/ /g, encodeURIComponent(' '))
  const title = parser(`This "${actionTitle}" action requires authorization, please ***[click to authorize](${authUrl})***, after authorization you will get a token, paste here and submit, then you can click the "${actionTitle}" button again.`)
  const str = authTempRender({
    title,
    data: parser({
      whId,
      uid
    })
  })
  const r = {
    attachments: [
      JSON.parse(str)
    ]
  }
  await RCGH.create({
    id: uid,
    token: generate()
  })
  await postMessage(url, r)
}

async function auth (inst, data) {
  const { token } = data
  if (token === inst.token) {
    await RCGH.update({
      verified: 1,
      token: ''
    }, {
      where: {
        id: inst.id
      }
    })
    const wh = await Webhook.findByPk(data.whId)
    const url = wh.rc_webhook
    const msg = messageTempRender({
      title: 'Authorization done'
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
  } else {
    return {
      status: 400,
      message: 'error'
    }
  }
}

async function closeIssue (user, config) {
  const url = `/repos/${config.owner}/${config.repo}/issues/${config.n}`
  return user.gh.request({
    data: {
      state: 'close'
    },
    method: 'patch',
    url
  })
    .then(d => d.data)
    .catch(err => {
      console.error('closeIssue error', err)
    })
}

async function closePr (user, config) {
  const url = `/repos/${config.owner}/${config.repo}/pulls/${config.n}`
  return user.gh.request({
    data: {
      state: 'close'
    },
    method: 'patch',
    url
  })
    .then(d => d.data)
    .catch(err => {
      console.error('closePr error', err)
    })
}

async function ghAction (user, body) {
  const {
    data
  } = body
  const { action } = data
  if (action === 'close-issue') {
    await closeIssue(user, data)
  } else if (action === 'close-pr') {
    await closePr(user, data)
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
  const {
    id,
    accountId
  } = req.body.user
  const rcId = `${accountId}-${id}`
  const inst = await RCGH.findByPk(rcId)
  if (!inst) {
    await sendAuthMessage(req.body)
    return res.status(404).send('not exist')
  }
  if (data.action === 'auth') {
    const d = await auth(inst, data)
    return res.status(d.status).send(d.message)
  }
  if (!inst.verified) {
    await sendAuthMessage(req.body)
    return res.send('not authed')
  }
  const u = await User.findByPk(inst.gh_id)
  await ghAction(u, req.body)
  res.send('ok')
}

export default (app) => {
  app.post('/rc/action', action)
}
