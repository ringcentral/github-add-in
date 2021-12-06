/**
 * bot handle github events
 */

/**
 * handle github webhook
 */

import { BotWebhook } from '../models/bot-webhook'
import { CardUpdateRef } from '../models/card-update-ref'
import Bot from 'ringcentral-chatbot-core/dist/models/Bot'
import {
  transform
} from '../handlers/webhook'
import axios from 'axios'
// import _ from 'lodash'

export const repositoryEventProps = [
  'action',
  'repository',
  'organization',
  'installation',
  'sender'
]

function getWebhook (uid) {
  return BotWebhook.findByPk(uid)
}

export function postMessage (url, data) {
  return axios.post(url, data, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(r => r.data)
}

function getAction (data) {
  try {
    return data.body[5].columns[2].items[0].actions[0]
  } catch (e) {
    return null
  }
}

export async function prepareUpdateCard (data, result) {
  if (!result || !result.id) {
    return false
  }
  const actionsNeedUpdate = getAction(data)
  if (!actionsNeedUpdate || !actionsNeedUpdate.data || !actionsNeedUpdate.data.shouldUpdate) {
    return false
  }
  const {
    actionTitle,
    action,
    updatedAction,
    updatedTitle,
    botId,
    refId
  } = actionsNeedUpdate.data
  Object.assign(actionsNeedUpdate.data, {
    updatedAction: action,
    updatedTitle: actionTitle,
    actionTitle: updatedTitle,
    action: updatedAction
  })
  Object.assign(actionsNeedUpdate, {
    title: updatedTitle
  })
  const up = {
    id: refId,
    botId,
    cardId: result.id,
    data
  }
  await CardUpdateRef.create(up)
}

export default async function webhook2 (req, res) {
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
  const bot = await Bot.findByPk(wh.bot_id)
  if (!bot) {
    res.status(404)
    return res.send('bot not exist')
  }
  // console.log('-----')
  // console.log(JSON.stringify(req.body, null, 2))
  // console.log('-----')
  const data = transform({
    ...req.body,
    whId: id,
    botId: wh.bot_id,
    groupId: wh.group_id
  }, true)
  // console.log('-----')
  // console.log(JSON.stringify(data, null, 2))
  // console.log('-----')
  const d = data.attachments[0]
  if (!data) {
    res.send('skip')
    return 'skip'
  }

  // console.log('webhook', wh.rc_webhook, r.data)
  const x = await bot.sendAdaptiveCard(wh.group_id, d)
  await prepareUpdateCard(d, x)
  /*
  x {
  id: '3333333',
  creationTime: '2021-12-06T02:40:52.588Z',
  lastModifiedTime: '2021-12-06T02:40:52.632Z',
  type: 'AdaptiveCard',
  creator: { id: '333333' },
  chatIds: [ '333333' ],
  version: '1.3'
}
  */
  res.send(x)
}
