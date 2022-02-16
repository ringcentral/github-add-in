/**
 * control wehbook db ops
 */

import { Webhook as AddInWebhook } from '../models/webhook'
import { BotWebhook } from '../models/bot-webhook'
import { User } from '../models/gh'
import _ from 'lodash'

function getWebhook (path) {
  return path.startsWith('/bot')
    ? BotWebhook
    : AddInWebhook
}

export async function create (req, res) {
  const Webhook = getWebhook(req.path)
  const { id: userId } = req.user
  const {
    body
  } = req
  const obj = {
    gh_user_id: userId,
    ..._.pick(body, [
      'id',
      'gh_user',
      'rc_webhook',
      'gh_webhook_id',
      'gh_org',
      'gh_repo',
      'gh_events',
      'group_id',
      'bot_id'
    ])
  }
  // console.log('====')
  // console.log(obj, req.path)
  // console.log('====')
  // console.log('====')
  // console.log(Webhook)
  // console.log('====')
  const r = await Webhook.create(obj)
  const user = await User.findByPk(userId)
  const propName = req.path.startsWith('/bot')
    ? 'bot_webhooks'
    : 'webhooks'
  const str = user[propName] || ''
  const webhooks = str
    .split(',')
    .filter(d => d)
  webhooks.push(r.id)
  await User.update({
    [propName]: webhooks.join(',')
  }, {
    where: {
      id: userId
    }
  })
  res.send(r)
}

export async function del (req, res) {
  const { id } = req.params
  const { id: userId } = req.user
  const Webhook = getWebhook(req.path)
  const r = await Webhook.destroy({
    where: {
      id
    }
  })
  const user = await User.findByPk(userId)
  const propName = req.path.startsWith('/bot')
    ? 'bot_webhooks'
    : 'webhooks'
  const str = user[propName] || ''
  const webhooks = str
    .split(',')
    .filter(d => d)
    .filter(d => d !== id)
    .join(',')
  await User.update({
    [propName]: webhooks
  }, {
    where: {
      id: userId
    }
  })
  res.send({
    result: r
  })
}

export async function list (req, res) {
  const { id } = req.user
  const gh = await User.findByPk(id)
  const propName = req.path.startsWith('/bot')
    ? 'bot_webhooks'
    : 'webhooks'
  const str = gh[propName] || ''
  const webhookIds = str
    .split(',')
    .filter(d => d)
    .map(id => ({ id }))
  if (!webhookIds.length) {
    return res.send([])
  }
  const Webhook = getWebhook(req.path)
  const r = await Webhook.batchGet(webhookIds)
  res.send(r)
}

export async function update (req, res) {
  const { id } = req.params
  // const { id: userId } = req.user
  const Webhook = getWebhook(req.path)
  const r = await Webhook.update(req.body, {
    where: {
      id
    }
  })
  res.send(r)
}

export default (app, jwtAuth) => {
  app.get(['/wh', '/bot-wh'], jwtAuth, list)
  app.post(['/wh', '/bot-wh'], jwtAuth, create)
  app.post(['/wh/:id', '/bot-wh/:id'], jwtAuth, update)
  app.delete(['/wh/:id', '/bot-wh/:id'], jwtAuth, del)
}
