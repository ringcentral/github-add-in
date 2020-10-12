/**
 * logout function
 */

import fetch from '../lib/fetch'

export default async function () {
  const path = '/api/action'
  await fetch.post(window.rc.server + path, {
    action: 'logout'
  }, {
    handleErr: () => {
      console.log('logout error')
    }
  })
  window.localStorage.removeItem(window.rc.jwtPrefix + ':rcpf-jwt-token')
}
