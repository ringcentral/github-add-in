/**
 * test script
 */

require('dotenv').config()

const { resolve } = require('path')
const axios = require('axios')
const {
  NAME = 'pr',
  STATIC_WEBHOOK
} = process.env

async function run () {
  const p = resolve(__dirname, '../cards', NAME + '.json')
  const json = require(p)
  const data = {
    attachments: [json]
  }
  const r = await axios.post(STATIC_WEBHOOK, data, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
  console.log(r.data)
}

run()
