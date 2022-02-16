/**
 * bot interactive handler
 */

import { RCGH } from '../models/rc-gh'
import { User } from '../models/gh'
import Bot from 'ringcentral-chatbot-core/dist/models/Bot'
import { CardUpdateRef } from '../models/card-update-ref'
import { prepareUpdateCard } from './bot-webhook'
// import { Webhook } from '../models/webhook'
import { ghAction } from '../handlers/add-in-action'
import { handleMessage } from './bot-logic'
import { transform } from '../handlers/webhook'

function getId (user) {
  const {
    accountId
  } = user
  return accountId
}

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
  await handleMessage(bot, group)
}

async function updateCard (ref) {
  const {
    id,
    data,
    botId,
    cardId
  } = ref
  const obj = transform({
    ...data,
    refId: id
  }).attachments[0]
  const bot = await Bot.findByPk(botId)
  await bot.updateAdaptiveCard(cardId, obj)
  await prepareUpdateCard(data, { id: cardId }, id, botId)
}

export default async function action (req, res) {
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
  const inst = await RCGH.findByPk(rcId)
  if (!inst) {
    await sendAuthMessage(req.body)
    return res.status(200).send('not exist')
  }
  const { refId } = data
  if (refId) {
    const ref = await CardUpdateRef.findByPk(refId)
    if (ref) {
      await updateCard(ref)
      return res.status(200).send('updated')
    }
  }
  // if (!inst.verified) {
  //   await sendAuthMessage(req.body)
  //   return res.send('not authed')
  // }
  const u = await User.findByPk(inst.gh_id)
  await ghAction(u, req.body)
  res.send('ok')
}
