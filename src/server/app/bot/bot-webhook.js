/**
 * bot handle github events
 */

/**
 * handle github webhook
 */

import { BotWebhook } from '../models/bot-webhook'
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
  // console.log('x', x)
  res.send(x)
}
