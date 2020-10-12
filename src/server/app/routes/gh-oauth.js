import { User } from '../models/gh'
import copy from 'json-deep-copy'
import jwt from 'jsonwebtoken'
import { pack, jwtPrefix, extraPath } from '../common/constants'

const { SERVER_SECRET, APP_HOME } = process.env

export default async (req, res) => {
  const { code, state } = req.query
  const user = await User.init({ code, state })
  const { id } = user
  const token = jwt.sign({
    id
  }, SERVER_SECRET, { expiresIn: '120y' })
  const red = extraPath + APP_HOME + '?webhook=' + state
  const data = {
    redirect: red,
    title: pack.name,
    jwtPrefix,
    token
  }
  data._global = copy(data)
  res.render('gh-oauth', data)
}
