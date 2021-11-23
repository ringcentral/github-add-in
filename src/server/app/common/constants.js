import { resolve } from 'path'
import crypto from 'crypto'
import { User } from '../models/gh'
import copy from 'json-deep-copy'
import { SDK } from '@ringcentral/sdk'

const {
  RINGCENTRAL_SERVER,
  RINGCENTRAL_APP_SERVER,
  CDN,
  SERVER_HOME,
  SERVICE_NAME,
  RINGCENTRAL_CLIENT_ID,
  RINGCENTRAL_CLIENT_SECRET
} = process.env
const arr = RINGCENTRAL_APP_SERVER.split('/')
const root = arr[0] + arr[1] + arr[2]
const user = new User()
const cwd = process.cwd()

export const defaultState = '__default_state_'
export const extraPath = RINGCENTRAL_APP_SERVER.replace(root, '')
export const pack = require(resolve(cwd, 'package.json'))
export const jwtPrefix = crypto.createHash('md5').update(RINGCENTRAL_APP_SERVER).digest('hex')
export const authUrlDefault = user.authorizeUri(defaultState)

const base = {
  version: pack.version,
  title: pack.name,
  home: SERVER_HOME,
  server: RINGCENTRAL_APP_SERVER,
  cdn: CDN || RINGCENTRAL_APP_SERVER,
  serviceName: SERVICE_NAME,
  jwtPrefix,
  defaultState,
  authUrlDefault
}
base._global = copy(base)

export const data = base
export const FEEDBACK_URL = 'https://github.com/ringcentral/github-notification-app/issues/new'
export const GITHUB_ICON_URL = 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'

const baseURL = (name) => {
  return `https://raw.githubusercontent.com/ringcentral/github-notification-app/main/icons_v2/${name}.png`
}
export const icons = {
  comment: baseURL('comment'),
  issue: baseURL('issue'),
  feedback: baseURL('feedback'),
  pull: baseURL('pull-request'),
  push: baseURL('push'),
  release: baseURL('release'),
  common: baseURL('github')
}

export const createRc = () => {
  return new SDK({
    server: RINGCENTRAL_SERVER,
    clientId: RINGCENTRAL_CLIENT_ID,
    clientSecret: RINGCENTRAL_CLIENT_SECRET,
    redirectUri: RINGCENTRAL_APP_SERVER + '/bot-auth'
  })
}
