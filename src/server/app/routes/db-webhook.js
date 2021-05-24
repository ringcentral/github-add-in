/**
 * control wehbook db ops
 */

import { Webhook } from '../models/webhook'
import { User } from '../models/gh'
import _ from 'lodash'

export async function create (req, res) {
  const { id: userId } = req.user
  const {
    body
  } = req
  const r = await Webhook.create({
    gh_user_id: userId,
    ..._.pick(body, [
      'id',
      'gh_user',
      'rc_webhook',
      'gh_webhook_id',
      'gh_org',
      'gh_repo',
      'gh_events'
    ])
  })
  const user = await User.findByPk(userId)
  const webhooks = (user.webhooks || '')
    .split(',')
    .filter(d => d)
  webhooks.push(r.id)
  await User.update({
    webhooks: webhooks.join(',')
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
  const r = await Webhook.destroy({
    where: {
      id,
      gh_user_id: userId
    }
  })
  const user = await User.findByPk(userId)
  const webhooks = (user.webhooks || '')
    .split(',')
    .filter(d => d)
    .filter(d => d !== id)
    .join(',')
  await User.update({
    webhooks
  }, {
    where: {
      id: userId
    }
  })
  res.send(r)
}

export async function list (req, res) {
  const { id } = req.user
  const gh = await User.findByPk(id)
  const webhookIds = (gh.webhooks || '')
    .split(',')
    .filter(d => d)
    .map(id => ({ id }))
  if (!webhookIds.length) {
    return res.send([])
  }
  const r = await Webhook.batchGet(webhookIds)
  res.send(r)
}

export async function update (req, res) {
  const { id } = req.params
  const { id: userId } = req.user
  const r = await Webhook.update(req.body, {
    where: {
      id,
      gh_user_id: userId
    }
  })
  res.send(r)
}

export default (app, jwtAuth) => {
  app.get('/wh', jwtAuth, list)
  app.post('/wh', jwtAuth, create)
  app.post('/wh/:id', jwtAuth, update)
  app.delete('/wh/:id', jwtAuth, del)
}
