/**
 * apis to fetch data
 *
 */

import fetch from '../../lib/fetch'

export async function request ({
  path = '/wh',
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
    path: '/wh/' + id,
    method: 'post',
    data: update
  })
}

export async function delDbWebhook (
  id
) {
  return request({
    path: '/wh/' + id,
    method: 'delete'
  })
}

export async function listDbWebhook () {
  const r = await request({
    method: 'get'
  })
  return r || []
}
