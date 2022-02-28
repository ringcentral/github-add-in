/**
 * bot interactive handler
 */

import { RCGH } from '../models/rc-gh'
import { User } from '../models/gh'
import Bot from 'ringcentral-chatbot-core/dist/models/Bot'
import { CardUpdateRef } from '../models/card-update-ref'
import { ghAction, getId } from '../handlers/add-in-action'
import { handleMessage } from './bot-logic'
import {
  transform
} from '../handlers/webhook'

async function sendAuthMessage (body) {
  const {
    data
  } = body
  const {
    botId,
    groupId
  } = data
  const bot = await Bot.findByPk(botId)
  const group = {
    id: groupId
  }
  const conf = {
    isAuth: true
  }
  await handleMessage(bot, group, conf)
}

function buildMessage (data) {
  return data.actionMessage || 'Action submitted'
}

function isUpdateAction (action) {
  return [
    'reopen-issue',
    'close-issue',
    'close-pr',
    'reopen-pr'
  ].includes(action)
}

async function tryUpdateCard (user, data) {
  const {
    refId,
    action
  } = data
  if (!refId || !isUpdateAction(action)) {
    return false
  }
  const ref = await CardUpdateRef.findByPk(refId)
  if (!ref || !ref.data) {
    return false
  }
  const bot = await Bot.findByPk(data.botId)
  if (!bot) {
    return false
  }
  const formatted = transform(
    {
      ...ref.data,
      formatConfig: {
        removeAction: true,
        message: buildMessage(data)
      }
    }
  )
  const d = formatted.attachments[0]
  await bot.updateAdaptiveCard(ref.cardId, d)
}

export default async function action (req, res) {
  const {
    user,
    data
  } = req.body
  if (!user || !data) {
    res.status(400).send('not ok')
    return false
  }
  const rcId = getId(user)
  const inst = await RCGH.findByPk(rcId)
  if (!inst) {
    await sendAuthMessage(req.body)
    return res.status(200).send('not exist')
  }
  // const { refId } = data
  // if (refId) {
  //   const ref = await CardUpdateRef.findByPk(refId)
  //   if (ref) {
  //     await updateCard(ref)
  //     return res.status(200).send('updated')
  //   }
  // }
  // if (!inst.verified) {
  //   await sendAuthMessage(req.body)
  //   return res.send('not authed')
  // }
  const u = await User.findByPk(inst.gh_id)
  await tryUpdateCard(user, data)
  await ghAction(u, req.body)
  res.send('ok')
}
