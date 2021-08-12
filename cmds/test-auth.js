/**
 * test script
 */

const axios = require('axios')

async function run () {
  const url = 'http://127.0.0.1:4011/rc/action'
  // const data = {
  //   data: {
  //     whId: 'GpkXblzzs',
  //     action: 'close-issue',
  //     uid: 'testxxxx'
  //   },
  //   user: {
  //     accountId: 'test1',
  //     id: 'xxx1'
  //   }
  // }
  const data = {
    data: {
      whId: 'GpkXblzzs',
      action: 'auth',
      token: 'r74c6XRnS'
    },
    user: {
      accountId: 'test1',
      id: 'xxx1'
    }
  }
  const r = await axios.post(url, data, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }).catch(console.error)
  console.log(r.data)
}

run()
