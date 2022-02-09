/**
 * apis to fetch data
 *
 */

import fetch from '../../lib/fetch'

const prefix = window.rc.isBot
  ? '/bot-wh'
  : '/wh'
const ext = window.rc.isBot
  ? {
    bot_id: window.rc.query.botId,
    group_id: window.rc.query.groupId
  }
  : {}

export async function request ({
  path = prefix,
  method,
  data
}) {
  const third = data
    ? {
      handleErr: (e) => {
        console.log(e)
      }
    }
    : undefined
  const secondArg = data || {
    handleErr: (e) => {
      console.log(e)
    }
  }
  return fetch[method](window.rc.server + path, secondArg, third)
}

export async function createDbWebhook ({
  id,
  ghWebhookId,
  rcWebhook,
  user,
  org,
  repo,
  events
}) {
  return request({
    method: 'post',
    data: {
      id,
      ...ext,
      gh_webhook_id: ghWebhookId,
      rc_webhook: rcWebhook,
      gh_user: user,
      gh_org: org,
      gh_repo: repo,
      gh_events: events.join(',')
    }
  })
}

export async function updateDbWebhook ({
  id,
  update
}) {
  return request({
    path: prefix + '/' + id,
    method: 'post',
    data: update
  })
}

export async function delDbWebhook (
  id
) {
  return request({
    path: prefix + '/' + id,
    method: 'delete'
  })
}

export async function listDbWebhook () {
  const r = await request({
    method: 'get'
  })
  return r || []
}
