/**
 * routes for github webhooks
 */

import { Webhook } from '../models/webhook'
import axios from 'axios'

function formStar (body) {
  const action = body.action
  const map = {
    created: 'New Star!',
    deleted: 'Lost a star'
  }
  const ext = {
    title: map[action]
  }
  return formCommon(body, ext)
}

function formRelease (body) {
  const url = body.release.html_url
  const type = ''
  const ext = {
    title: `Release ${type}${body.action}`,
    title_link: url
  }
  const cards = [{
    title: 'Release',
    value: `[${body.release.title}](${body.release.html_url})`
  }]
  return formCommon(body, ext, cards)
}

function formIssue (body) {
  let url = body.issue.html_url
  let type = ''
  const isPull = /\/pull\/\d+$/.test(url)
  const title = isPull ? 'Pull request' : 'Issue'
  const cards = [{
    title,
    value: `[${body.issue.title}](${body.issue.html_url})`
  }]
  if (body.comment) {
    url = body.comment.html_url
    type = 'comment '
    if (body.comment.body) {
      cards.push({
        title: 'Comment body',
        value: body.comment.body
      })
    }
  }
  const ext = {
    title: `${title} ${type}${body.action}`,
    title_link: url
  }

  return formCommon(body, ext, cards)
}

function formPr (body) {
  let type = ''
  let url = body.pull_request.html_url
  const cards = [{
    title: 'Pull request',
    value: `[${body.pull_request.title}](${body.pull_request.html_url})`
  }]
  if (body.review) {
    type = ' review'
    url = body.review.html_url
    if (body.review.body) {
      cards.push({
        title: 'Review body',
        value: body.review.body
      })
    }
  } else if (body.comment) {
    type = ' comment'
    url = body.comment.html_url
    if (body.comment.body) {
      cards.push({
        title: 'Comment body',
        value: body.comment.body
      })
    }
  }
  const ext = {
    title: `Pull Request${type} ${body.action}`,
    title_link: url
  }
  return formCommon(body, ext, cards)
}

function formHook (body) {
  const ext = {
    title: 'New GitHub Webhook Created'
  }
  const cards = [{
    title: 'Events',
    value: body.hook.events.join(', ')
  }]
  return formCommon(body, ext, cards)
}

function formPush (body) {
  const ext = {
    title: 'New Push event',
    title_link: body.compare
  }
  const cards = body.commits.map(c => {
    return {
      title: 'Commit',
      value: `[${c.message}](${c.url})`
    }
  })
  return formCommon(body, ext, cards)
}

function formCommon (body, extend = {}, cards = []) {
  const title = extend.title || 'New event!'
  const url = extend.title_link || body.repository.html_url
  const r = {
    attachments: [
      {
        type: 'Card',
        color: '#00ff2a',
        title,
        fallback: extend.title_link,
        title_link: url,
        text: url,
        image_url: body.repository.owner.avatar_url,
        fields: [
          {
            title: 'Sender',
            value: `[${body.sender.login}](${body.sender.html_url})`,
            style: 'long'
          },
          {
            title: 'Repository',
            value: `[${body.repository.full_name}](${body.repository.html_url})`,
            style: 'long'
          },
          ...cards
        ],
        ...extend
      }
    ]
  }
  if (!extend.title) {
    r.text = 'It is a event the Github Integration do not fully support, we will improve in future updates.'
  }
  return r
}

function transform (body) {
  // console.log('========')
  // console.log(body)
  // console.log('========')
  if (body.hook) {
    return formHook(body)
  } else if (body.starred_at) {
    return formStar(body)
  } else if (body.release) {
    return formRelease(body)
  } else if (body.issue) {
    return formIssue(body)
  } else if (body.pull_request) {
    return formPr(body)
  } else if (body.commits) {
    return formPush(body)
  } else {
    return formCommon(body)
  }
}

function getWebhook (uid) {
  return Webhook.findByPk(uid)
}

const webhook = async (req, res) => {
  const {
    id
  } = req.params
  if (!id) {
    res.status(400)
    return res.send('id required')
  }
  const wh = await getWebhook(id)
  if (!wh) {
    res.status(404)
    return res.send('webhook not exist')
  }
  const data = transform(req.body)
  const r = await axios.post(wh.rc_webhook, data, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
  // console.log('webhook', wh.rc_webhook, r.data)
  res.send(r.data)
}

export default (app) => {
  app.post('/gh/webhook/:id', webhook)
}
