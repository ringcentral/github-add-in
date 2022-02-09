import { User } from '../models/gh'
import copy from 'json-deep-copy'
import jwt from 'jsonwebtoken'
import { pack, jwtPrefix, extraPath, createRc } from '../common/constants'
import { RCGH } from '../models/rc-gh'

const {
  SERVER_SECRET,
  APP_HOME,
  RINGCENTRAL_APP_SERVER
} = process.env

export default async (req, res) => {
  const { code, state } = req.query
  const rc = createRc()
  const rcToken = await rc.platform().login({
    code
  }).then(d => d.json())
  const arr = state.split(':')
  const groupId = arr[1]
  const botId = arr[2]
  const ghId = arr[3]
  const rcId = rcToken.owner_id
  await RCGH.create({
    id: rcId,
    gh_id: ghId
  })
  await User.update({
    rc_id: rcToken.owner_id
  }, {
    where: {
      id: ghId
    }
  })
  const token = jwt.sign({
    id: ghId
  }, SERVER_SECRET, { expiresIn: '120y' })
  const red = extraPath + APP_HOME + `/bot-config?groupId=${groupId}&botId=${botId}`

  const data = {
    redirect: red,
    title: pack.name,
    jwtPrefix,
    token,
    cdn: RINGCENTRAL_APP_SERVER
  }
  const view = 'gh-oauth'
  data._global = copy(data)
  res.render(view, data)
}
