
/**
 * standalone server file, no cli
 */

import { createApp } from 'glip-integration-js'
import initDb from './app/common/init-db'

const path = './index.js'
console.log('-> bot:', path)
const conf = require(path)
const app = createApp(conf)

const {
  RINGCENTRAL_PORT: port,
  RINGCENTRAL_HOST: host,
  APP_HOME = '/'
} = process.env

app.listen(port, host, () => {
  console.log(`-> server running at: http://${host}:${port}${APP_HOME}`)
  initDb()
})
