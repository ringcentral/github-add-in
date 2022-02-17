
import { User } from '../models/gh'
import basicAuth from 'express-basic-auth'
import { Webhook } from '../models/webhook'
import { BotWebhook } from '../models/bot-webhook'
import { RCGH } from '../models/rc-gh'
import { CardUpdateRef } from '../models/card-update-ref'
import { Token } from '../models/token'
import Bot from 'ringcentral-chatbot-core/dist/models/Bot'

const {
  RINGCENTRAL_ADMIN_USERNAME,
  RINGCENTRAL_ADMIN_PASSWORD
} = process.env

const tableMapper = {
  User,
  Webhook,
  BotWebhook,
  RCGH,
  CardUpdateRef,
  Token,
  Bot
}

const auth = basicAuth({
  users: {
    [RINGCENTRAL_ADMIN_USERNAME]: RINGCENTRAL_ADMIN_PASSWORD
  }
})

// create database tables if not exists
const initDb = async (req, res) => {
  await User.sync()
  await Webhook.sync()
  res.send('ok')
}

const viewGhUser = async (req, res) => {
  const users = await User.findAll()
  let result = ''
  for (const user of users) {
    result += `<pre>\n${JSON.stringify(user, null, 2)}\n</pre>\n`
  }
  res.send(result)
}

async function update (req, res) {
  const webhooks = await Webhook.findAll()
  // console.log('hooks', webhooks)
  const tree = webhooks.reduce((p, w) => {
    const {
      gh_user_id: ghId
    } = w
    if (!p[ghId]) {
      p[ghId] = []
    }
    p[ghId].push(w.id)
    return p
  }, {})
  // console.log('tree', tree)
  const ids = Object.keys(tree)
  for (const id of ids) {
    const webhooks = tree[id].join(',')
    await User.update({
      webhooks
    }, {
      where: {
        id
      }
    })
    // console.log(r)
  }
  res.send('ok')
}

async function action (req, res) {
  const {
    action,
    table,
    inst
  } = req.body
  const Table = tableMapper[table]
  let r = ''
  if (action === 'list') {
    r = await Table.findAll()
  } else if (action === 'create') {
    r = await Table.create(inst)
  } else if (action === 'del') {
    r = await Table.destroy({
      where: {
        id: inst.id
      }
    })
  }
  res.send({
    result: r
  })
}

export default (app) => {
  app.put('/admin/setup-database', auth, initDb)
  app.get('/admin/view-gh', auth, viewGhUser)
  app.post('/admin/update', auth, update)
  app.post('/admin/action', auth, action)
}
