/**
 * bot control apis
 * /api
 */

import { User } from '../models/gh'
import _ from 'lodash'

const supportedActions = [
  'get-user',
  'op',
  'logout'
]

export default async (req, res) => {
  const { user } = req
  if (!user) {
    res.status(401)
    return res.send('please login first')
  }
  const { body = {} } = req
  const {
    action
  } = body
  if (!supportedActions.includes(action)) {
    res.status(400)
    return res.send('not supported')
  }
  const { id } = user
  let result
  const userInst = await User.findByPk(id).catch(console.error)
  let status = 0
  if (action === 'logout') {
    result = await userInst.logout()
  } else if (action === 'get-user') {
    result = userInst
    if (_.isEmpty(result)) {
      res.status(401)
      return res.send('user not exist')
    }
  } else if (action === 'op') {
    const {
      data,
      method,
      url,
      headers = undefined
    } = body
    result = await userInst.gh.request({
      data,
      method,
      url,
      headers
    }).catch(err => {
      status = 1
      console.error('api error')
      return err
    })
    result = result && result.data ? result.data : result
  }
  res.send({
    status,
    result
  })
}
