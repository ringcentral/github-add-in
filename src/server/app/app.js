
import viewIndex from './routes/view-index'
import oauth from './routes/gh-oauth'
import logout from './routes/logout'
import api from './routes/api'
import { resolve } from 'path'
import jwt from 'express-jwt'
import staticRoute from './routes/static'
import admin from './routes/admin'
import webhook from './routes/gh-webhook'
import dbWebhook from './routes/db-webhook'
import act from './routes/rc-action'

export default function extend (app) {
  const jwtAuth = jwt({
    secret: process.env.SERVER_SECRET,
    algorithms: ['HS256']
  })
  const {
    APP_HOME = '/'
  } = process.env

  staticRoute(app)
  app.set('views', resolve(__dirname, '../views'))
  app.set('view engine', 'pug')

  app.get('/gh/oauth', oauth)
  const errHandler = function (err, req, res, next) {
    if (err && err.name === 'UnauthorizedError') {
      res.status(401).send('invalid token...')
    } else {
      next()
    }
  }
  app.post('/api/action', jwtAuth, errHandler, api)
  app.get('/logout', logout)

  app.get(APP_HOME, viewIndex('app'))
  app.get('/token', viewIndex('token'))
  app.get('/test-app', viewIndex('test'))
  webhook(app)
  admin(app)
  act(app)
  dbWebhook(app, jwtAuth)
}
