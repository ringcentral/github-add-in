import { User } from '../models/gh'
import copy from 'json-deep-copy'
import jwt from 'jsonwebtoken'
import { createRc, pack, jwtPrefix, extraPath } from '../common/constants'

const {
  SERVER_SECRET,
  APP_HOME,
  RINGCENTRAL_APP_SERVER
} = process.env

const rc = createRc()

export default async (req, res) => {
  const { code, state } = req.query
  const user = await User.init({ code, state })
  const { id, groupId } = user
  const loginUrl = rc.loginUrl({
    state: `${state}:${id}`
  })
  // console.log('req.query', req.query)
  // console.log('loginurl', loginUrl)
  if (groupId) {
    res.redirect(loginUrl)
    return
  }
  const token = jwt.sign({
    id
  }, SERVER_SECRET, { expiresIn: '120y' })
  const isTokenAuth = state === 'token-auth'
  const red = isTokenAuth
    ? RINGCENTRAL_APP_SERVER + '/token'
    : extraPath + APP_HOME + '?webhook=' + state
  const data = {
    redirect: red,
    title: pack.name,
    jwtPrefix,
    token,
    authToken: user.authToken,
    cdn: RINGCENTRAL_APP_SERVER
  }
  const view = state === 'token-auth'
    ? 'token-auth'
    : 'gh-oauth'
  data._global = copy(data)
  res.render(view, data)
}
