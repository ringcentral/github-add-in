/**
 * routes for github webhooks
 */

import { Webhook } from '../models/webhook'
import axios from 'axios'

function transform (body) {
  return body
}

function getWebhook (uid) {
  return Webhook.findByPk(uid)
}

const webhook = async (req, res) => {
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
  const data = transform(req.body)
  const r = await axios.post(wh.rc_webhook, data)
  console.log('webhook', wh.rc_webhook, r.data)
  res.send(r.data)
}

export default (app) => {
  app.get('/gh/webhook/:id', webhook)
}
