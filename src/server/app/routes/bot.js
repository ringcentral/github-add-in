import webhook from '../bot/bot-webhook'
import botView from '../bot/bot-view'
import botAuth from '../bot/bot-rc-auth'
import botAction from '../bot/bot-action'

export default (app) => {
  app.get('/bot-config', botView)
  app.get('/bot-auth', botAuth)
  app.post('/bot-action', botAction)
  app.post('/gh-bot/webhook/:id', webhook)
}
