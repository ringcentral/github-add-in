/**
 * User class
 */

import { OAuthApp } from '@octokit/oauth-app'
import { Octokit } from '@octokit/core'
import { Service } from './gh-user'
import _ from 'lodash'

export class User extends Service {}

const SCOPES = 'admin:repo_hook read:user read:org'

const initOptions = {
  clientId: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  defaultScopes: SCOPES.split(/\r+/)
}

User.init = async ({ code, state }) => {
  const app = new OAuthApp(initOptions)
  const { token, scopes } = await app.createToken({
    state,
    code
  })
  const octokit = new Octokit({
    auth: token
  })
  const scope = _.isString(scopes) ? scopes : scopes.join(',')
  const { data: userInfo } = await octokit.request('/user')
  const id = userInfo.id.toString()
  const where = {
    id
  }
  let user = await User.findOne({
    where
  })
  const update = {
    gh_token: token,
    gh_user_info: userInfo,
    gh_scope: scope
  }
  if (user) {
    const update = {
      gh_token: token,
      gh_user_info: userInfo,
      gh_scope: scope
    }
    await User.update(update, {
      where
    })
    Object.assign(user, update)
    return user
  }
  user = await User.create({
    id,
    ...update
  })
  return user
}

Object.defineProperty(User.prototype, 'gh', {
  get: function () {
    const gh = new Octokit({
      auth: this.gh_token
    })
    return gh
  }
})

User.prototype.authorizeUri = function (state = '') {
  const app = new OAuthApp(initOptions)
  return app.getAuthorizationUrl({
    state
  })
}

User.prototype.logout = function (state = '') {
  const app = new OAuthApp(initOptions)
  return app.deleteAuthorization({
    token: this.gh_token
  })
}
