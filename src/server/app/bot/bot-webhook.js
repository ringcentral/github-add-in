/**
 * bot handle github events
 */

import { BotWebhook } from '../models/bot-webhook'
import { CardUpdateRef } from '../models/card-update-ref'
import Bot from 'ringcentral-chatbot-core/dist/models/Bot'
import {
  transform
} from '../handlers/webhook'
import axios from 'axios'
// import { cardUpdateExpire } from '../common/constants'

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

function isClosed (action) {
  return action === 'closed'
}

function isOpened (action) {
  return action === 'opened' || action === 'reopened'
}

function isActionCanUpdate (data) {
  if (!data.issue && !data.pull_request) {
    return false
  } else if (data.comment || data.review) {
    return false
  }
  const { action } = data
  return isClosed(action) || isOpened(action)
}

export async function prepareUpdateCard (data, result, botId) {
  if (!result || !result.id) {
    return false
  }
  if (!isActionCanUpdate(data)) {
    return false
  }
  const id = data.refId
  /* issue events
  - opened
  - edited
  - deleted
  - transferred
  - pinned
  - unpinned
  - closed
  - reopened
  - assigned
  - unassigned
  - labeled
  - unlabeled
  - locked
  - unlocked
  - milestoned
  - demilestoned

  pull events
  - assigned
  - unassigned
  - labeled
  - unlabeled
  - opened
  - edited
  - closed
  - reopened
  - synchronize
  - converted_to_draft
  - ready_for_review
  - locked
  - unlocked
  - review_requested
  - review_request_removed
  - auto_merge_enabled
  - auto_merge_disabled
   */
  const up = {
    id,
    botId,
    cardId: result.id,
    data
  }
  await CardUpdateRef.create(up)
}

function createUid (data) {
  const id = data.issue.id || data.pull_request.id
  const type = data.issue ? 'issue' : 'pull_request'
  const {
    whId
  } = data
  return `${type}-${whId}-${id}`
}

// function cardUpdateExpired (ref) {
//   return Date.now() - new Date(ref.updatedAt).getTime() > cardUpdateExpire
// }

// async function tryUpdateCard (dataToTrans, data, bot) {
//   if (!isActionCanUpdate(dataToTrans)) {
//     return false
//   }
//   const id = createUid(dataToTrans)
//   const ref = await CardUpdateRef.findByPk(id)
//   if (!ref) {
//     return false
//   }
//   if (cardUpdateExpired(ref)) {
//     await CardUpdateRef.destroy({
//       where: {
//         id
//       }
//     })
//     return false
//   }
//   await bot.updateAdaptiveCard(ref.cardId, data)
//   return true
// }

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
  const dataToTrans = {
    ...req.body,
    whId: id,
    botId: wh.bot_id,
    groupId: wh.group_id
  }
  dataToTrans.refId = createUid(dataToTrans)
  const data = transform(dataToTrans)
  // console.log('-----')
  // console.log(JSON.stringify(data, null, 2))
  // console.log('-----')
  const d = data.attachments[0]
  if (!data) {
    res.send('skip')
    return 'skip'
  }
  // const updateCard = await tryUpdateCard(dataToTrans, d, bot)
  // if (!updateCard) {
  //   const card = await bot.sendAdaptiveCard(wh.group_id, d)
  //   await prepareUpdateCard(dataToTrans, card, bot.id)
  // }
  const card = await bot.sendAdaptiveCard(wh.group_id, d)
  await prepareUpdateCard(dataToTrans, card, bot.id)
  // console.log('webhook', wh.rc_webhook, r.data)
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
  res.send('ok')
}
