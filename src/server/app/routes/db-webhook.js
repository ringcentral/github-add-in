/**
 * control wehbook db ops
 */

import { Webhook } from '../models/webhook'
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
  res.send(r)
}

export async function list (req, res) {
  const { id } = req.user
  const r = await Webhook.findAll({
    where: {
      gh_user_id: id
    }
  })
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
