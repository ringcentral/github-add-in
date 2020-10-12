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
  const q = window.location.href.split('?')[1] || ''
  const r = window.rc.server + window.rc.home + '?' + q
  window.location.href = window.rc.server + '/logout?redirect=' + encodeURIComponent(r)
}
