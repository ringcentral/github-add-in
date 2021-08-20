import {
  commentTempRender,
  commonTempRender,
  prTempRender,
  pushTempRender,
  releaseTempRender,
  issueTempRender,
  actionsTempRender,
  assetsTempRender,
  authorTempRender,
  columnSetsTempRender,
  commitsTempRender,
  repoTempRender,
  feedbackTempRender,
  titleTempRender,
  descTempRender
} from './templates'
import parse from './string-parser'

import _ from 'lodash'

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

export function formatAction (action) {
  return action.replace(/_/g, ' ')
}

export function formStar (body) {
  const action = body.action
  const map = {
    created: 'New Star!',
    deleted: 'Lost a star'
  }
  const ext = {
    title: map[action]
  }
  return formCommon(body, ext)
}

export function formRelease (body) {
  if (body.action !== 'published') {
    return ''
  }
  const url = body.release.html_url
  const ext = {
    icon: icons.release,
    title: `New release: [${body.release.tag_name}](${url})`,
    bodyTitle: 'Release Note',
    body: parse(`${body.release.body || 'No release note'}`)
  }
  const all = createCommonProps(body, ext)
  const assetsAll = (body.release.assets || [])
    .map(d => {
      return {
        message: d.name,
        url: d.browser_download_url
      }
    })
  const assets = assetsAll
    .slice(0, 3)
    .map(commitRender).join('\n')
  let assetsMore = null
  if (assetsAll.length > 3) {
    assetsMore = assetsAll.slice(3).map(commitRender).join('\n')
  }
  all.assets = assetsTempRender({
    assets: parse(assets),
    assetsMore: parse(assetsMore)
  })
  const str = releaseTempRender(all)
  // console.log('=====')
  // console.log(str)
  // console.log('=====')
  const r = {
    // title: `[${title}](${url})`,
    attachments: [
      JSON.parse(str)
    ]
  }
  return r
}

export function formIssue (body) {
  let url = body.issue.html_url
  let type = ''
  const isPull = /\/pull\/\d+$/.test(url)
  const pre = isPull ? 'Pull request' : 'Issue'
  if (body.comment) {
    url = body.comment.html_url
    type = 'comment on '
  }
  const link = `\\"[${body.issue.title}](${url})\\"`
  let action = formatAction(body.action)
  let pp = ''
  if (action === 'opened' || action === 'created') {
    pp = 'New '
    action = ''
  } else {
    action = ' ' + action
  }
  const ext = {
    icon: body.comment ? icons.comment : icons.issue,
    title: `${pp}${type}${pre} ${link}${action}`,
    actions: []
  }
  if (body.comment) {
    ext.body = parse(body.comment.body)
    ext.bodyTitle = 'Comment'
  } else {
    ext.body = parse(body.issue.body || '')
  }

  let actions = []
  const n = body.issue.number
  const columns = [
    {
      title: 'Issue #',
      value: `[${n}](${body.issue.html_url})`
    }
  ]
  const [owner, repo] = body.repository.full_name.split('/')
  const commonData = {
    owner,
    repo,
    n,
    whId: body.whId
  }
  if (body.comment) {
    actions = [{
      type: 'Action.OpenUrl',
      title: 'Quote reply',
      url: body.comment.html_url,
      sep: ','
    }, {
      type: 'Action.OpenUrl',
      title: 'Add comment',
      url: body.comment.html_url
    }]
  } else if (action === 'closed') {
    actions = [{
      type: 'Action.OpenUrl',
      title: 'Add comment',
      url: body.issue.html_url
    }]
  } else if (action === 'deleted') {
    actions = []
  } else {
    actions = [{
      type: 'Action.Submit',
      title: 'Close issue',
      data: parse({
        ...commonData,
        actionTitle: 'Close issue',
        action: 'close-issue'
      }),
      sep: ','
    }, {
      type: 'Action.OpenUrl',
      title: 'Add comment',
      url: body.issue.html_url
    }]
  }
  ext.actions = actions
  const all = createCommonProps(body, ext)
  all.columnSets = columnSetsTempRender({ columns })
  all.actions = actions.length
    ? actionsTempRender({ actions })
    : ''
  const str = body.comment
    ? commentTempRender(all)
    : issueTempRender(all)
  const r = {
    attachments: [
      JSON.parse(str)
    ]
  }
  return r
}

export function formPr (body) {
  let type = ''
  let url = body.pull_request.html_url
  let bodyTitle = ''
  let icon = icons.pull
  let msg = parse(body.pull_request.body || 'No pull request body')
  if (body.comment) {
    url = body.comment.html_url
    type = 'comment on '
    bodyTitle = 'Comment'
    msg = parse(body.comment.body || 'No comment body')
    icon = icons.comment
  } else if (body.review) {
    icon = icons.comment
    url = body.review.html_url
    type = 'review on '
    bodyTitle = 'Review message'
    msg = parse(body.review.body || 'No review body')
  }
  const link = `\\"[${body.pull_request.title}](${url})\\"`
  let action = formatAction(body.action)
  let pp = ''
  if (
    action === 'opened' ||
    action === 'created' ||
    action === 'submitted'
  ) {
    pp = 'New ' + type
    action = ''
  } else {
    action = ' ' + action
  }
  const title = `${pp}Pull request ${link}${action}`
  const ext = {
    icon,
    title,
    bodyTitle,
    body: msg,
    actions: []
  }

  const columns = [
    {
      title: 'Pull request #',
      value: `[${body.pull_request.number}](${body.pull_request.html_url})`
    }
  ]
  let actions = []
  if (body.comment || body.review) {
    const ref = body.comment || body.review
    actions = [{
      title: 'Quote reply',
      type: 'Action.OpenUrl',
      url: ref.html_url,
      sep: ','
    }, {
      title: 'Comment',
      type: 'Action.OpenUrl',
      url: ref.html_url
    }]
  } else if (action === 'closed') {
    actions = [{
      title: 'Comment',
      type: 'Action.OpenUrl',
      url: body.pull_request.html_url
    }]
  } else {
    actions = [{
      title: 'Close',
      type: 'Action.OpenUrl',
      url: body.pull_request.html_url,
      sep: ','
    },
    /* , {
      title: 'Merge',
      url: body.pull_request.html_url,
      sep: ','
    }, */
    {
      title: 'Comment',
      type: 'Action.OpenUrl',
      url: body.pull_request.html_url
    }]
  }
  ext.actions = actions
  const all = createCommonProps(body, ext)
  all.columnSets = columnSetsTempRender({ columns })
  all.actions = actionsTempRender({ actions })
  const str = body.comment || body.review
    ? commentTempRender(all)
    : prTempRender(all)
  // console.log('----')
  // console.log(str)
  // console.log('----')
  const r = {
    attachments: [
      JSON.parse(str)
    ]
  }
  return r
}

export function formHook (body) {
  const ext = {
    title: 'New GitHub Webhook Created',
    body: `Events: ${body.hook.events.join(', ')}`
  }

  return formCommon(body, ext)
}

function commitRender (c) {
  return `- [${c.message}](${c.url})`
}

export function formPush (body) {
  const msg = _.get(body, 'commits[0].message')
  const titleStr = msg
    ? `: \\"[${msg}](${body.compare})\\"`
    : ''
  const ext = {
    icon: icons.push,
    title: `New Push${titleStr}`,
    bodyTitle: 'Push message'
  }
  const all = createCommonProps(body, ext)
  const commits = body.commits.slice(0, 3).map(commitRender).join('\n')
  let moreCommits = null
  if (body.commits.length > 3) {
    moreCommits = body.commits.slice(3).map(commitRender).join('\n')
  }
  all.commits = commitsTempRender({
    commits: parse(commits),
    moreCommits: parse(moreCommits),
    hasMoreCommits: moreCommits
  })
  const str = pushTempRender(all)
  const r = {
    // title: `[${title}](${url})`,
    attachments: [
      JSON.parse(str)
    ]
  }
  return r
}

export function formAct (title, body, linkProp, actProp = 'action') {
  const link = linkProp
    ? _.get(body, linkProp)
    : undefined
  const act = body[actProp] || ''
  const action = act
    ? ` ${formatAction(act)}`
    : ''
  const titleStr = link
    ? `[${title}](${link})`
    : title
  const ext = {
    title: `New event: ${titleStr}${action}`
  }
  return formCommon(body, ext)
}

function createCommonProps (body, extend) {
  const title = extend.title || 'New event!'
  const iconUrl = extend.icon || icons.common
  const titleStr = titleTempRender({
    title,
    iconUrl
  })
  const desc = descTempRender({
    body: extend.body,
    hasDesc: extend.body,
    bodyTitle: extend.bodyTitle || 'message'
  })
  const actionsStr = extend.actions
    ? actionsTempRender({
      actions: extend.actions
    })
    : ''
  return {
    desc,
    title: titleStr,
    actions: actionsStr,
    repo: repoTempRender({
      name: body.repository.full_name,
      url: body.repository.html_url
    }),
    author: authorTempRender({
      loginUrl: body.sender.html_url,
      login: body.sender.login,
      url: body.sender.avatar_url
    }),
    feedback: feedbackTempRender({
      title: 'Feedback',
      actions: extend.actions,
      url: 'https://github.com/ringcentral/github-notification-app/issues/new',
      icon: icons.feedback
    })
  }
}

function formCommon (body, extend = {}) {
  const props = createCommonProps(body, extend)
  const all = commonTempRender(props)
  const r = {
    // title: `[${title}](${url})`,
    attachments: [
      JSON.parse(all)
    ]
  }
  return r
}