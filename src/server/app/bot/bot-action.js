/**
 * bot interactive handler
 */

import { RCGH } from '../models/rc-gh'
import { User } from '../models/gh'
import Bot from 'ringcentral-chatbot-core/dist/models/Bot'
// import { Webhook } from '../models/webhook'
import { ghAction, getId } from '../handlers/add-in-action'
import { handleMessage } from './bot-logic'

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

export default async function action (req, res) {
  const { log } = console
  log('==========')
  log(JSON.stringify(req.body, null, 2))
  log('==========')
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
    log('no inst')
    await sendAuthMessage(req.body)
    log('no inst end')
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
  await ghAction(u, req.body)
  res.send('ok')
}
