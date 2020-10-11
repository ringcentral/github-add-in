
/**
 * standalone server file, no cli
 */

import { createApp } from 'glip-integration-js'

const path = './index.js'
console.log('-> bot:', path)
const conf = require(path)
const app = createApp(conf)

export default app
