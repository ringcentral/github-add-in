/**
 * test script
 */

const axios = require('axios')

async function run () {
  const url = 'http://127.0.0.1:4011/rc/action'
  const data = {
    data: {
      whId: 'GpkXblzzs',
      actionTitle: 'Close issue',
      action: 'close-issue',
      owner: 'electerm',
      repo: 'test-repo',
      n: 9
    },
    user: {
      accountId: 'test1',
      id: 'xxx1'
    }
  }
  // const data = {
  //   data: {
  //     whId: 'GpkXblzzs',
  //     action: 'auth',
  //     uid: 'testxxxx',
  //     token: '9CTISro13'
  //   },
  //   user: {
  //     accountId: 'test1',
  //     id: 'xxx1'
  //   }
  // }
  const r = await axios.post(url, data, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
  console.log(r.data)
}

run()
