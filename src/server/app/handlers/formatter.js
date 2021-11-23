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
  descTempRender,
  commentSetsTempRender
} from './templates'
import {
  GITHUB_ICON_URL,
  FEEDBACK_URL,
  icons
} from '../common/constants'
import parse from './string-parser'
import copy from 'json-deep-copy'
import _ from 'lodash'

const commonEventData = {
  // activity: 'GitHub event',
  icon: GITHUB_ICON_URL
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
  const title = map[action]
  const ext = {
    title,
    fallbackText: title
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
  const fallbackText = `New release: ${body.release.tag_name}`
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
  all.fallbackText = fallbackText
  const str = releaseTempRender(all)
  // console.log('=====')
  // console.log(str)
  // console.log('=====')
  const r = {
    ...commonEventData,
    // title: `[${title}](${url})`,
    attachments: [
      JSON.parse(str)
    ]
  }
  return r
}

function markdownQuote (txt) {
  const res = txt.split('\n').map(t => {
    return '> ' + t
  }).join('\n') + '\n'
  return parse(res)
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
  const link = `"[${body.issue.title}](${url})"`
  const { action } = body
  let actionNew = formatAction(action)
  let pp = ''
  if (action === 'opened' || action === 'created') {
    pp = 'New '
    actionNew = ''
  } else {
    actionNew = ' ' + action
  }
  const ext = {
    icon: body.comment ? icons.comment : icons.issue,
    title: parse(`${pp}${type}${pre} ${link}${actionNew}`),
    actions: []
  }
  const fallbackText = parse(`${pp}${type}${pre} "${body.issue.title}"${actionNew}`)
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
    whId: body.whId,
    botId: body.botId,
    groupId: body.groupId
  }
  const cardProps = {
    id: 'githubCommentInput1',
    data: parse({
      ...commonData,
      ...commonEventData,
      actionTitle: 'Add Comment',
      action: 'add-comment'
    })
  }
  const card = commentSetsTempRender(cardProps)
  const commentAction = {
    type: 'Action.ShowCard',
    title: 'Add comment',
    card
  }
  if (body.comment) {
    const cardProps2 = {
      ...copy(cardProps),
      id: 'githubCommentInput2',
      value: markdownQuote(body.comment.body)
    }
    const card2 = commentSetsTempRender(cardProps2)
    const commentAction2 = {
      ...copy(commentAction),
      title: 'Quote reply',
      card: card2,
      sep: ','
    }
    actions = [commentAction2, commentAction]
  } else if (action === 'closed') {
    actions = [{
      type: 'Action.Submit',
      title: 'Reopen issue',
      data: parse({
        ...commonData,
        ...commonEventData,
        actionTitle: 'Reopen issue',
        action: 'reopen-issue'
      }),
      sep: ','
    }, commentAction]
  } else if (action === 'deleted' || action === 'locked') {
    actions = []
  } else {
    actions = [{
      type: 'Action.Submit',
      title: 'Close issue',
      data: parse({
        ...commonData,
        ...commonEventData,
        actionTitle: 'Close issue',
        action: 'close-issue'
      }),
      sep: ','
    }, commentAction]
  }

  ext.actions = actions
  const all = createCommonProps(body, ext)
  all.fallbackText = fallbackText
  all.columnSets = columnSetsTempRender({ columns })
  all.actions = actions.length
    ? actionsTempRender({
      actions,
      hasActions: true
    })
    : ''
  const str = body.comment
    ? commentTempRender(all)
    : issueTempRender(all)

  // console.log('-----')
  // console.log(str)
  // console.log('-----')
  const r = {
    ...commonEventData,
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
  const { action } = body
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
  const link = `"[${body.pull_request.title}](${url})"`
  let actionTxt = formatAction(action)
  let pp = ''
  if (
    action === 'opened' ||
    action === 'created' ||
    action === 'submitted'
  ) {
    pp = 'New ' + type
    actionTxt = ''
  } else {
    actionTxt = ' ' + action
  }
  const title = parse(`${pp}Pull request ${link}${actionTxt}`)
  const fallbackText = parse(`${pp}Pull request "${body.pull_request.title}"${actionTxt}`)
  const ext = {
    icon,
    title,
    bodyTitle,
    body: msg,
    actions: []
  }
  const htmlUrl = body.pull_request.html_url
  const columns = [
    {
      title: 'Pull request #',
      value: `[${body.pull_request.number}](${htmlUrl})`,
      sep: ','
    },
    {
      sep: ',',
      title: 'Files changed',
      value: `[${body.pull_request.changed_files}](${htmlUrl}/files)`
    },
    {
      title: 'Commits',
      value: `[${body.pull_request.commits}](${htmlUrl}/commits)`
    }
  ]
  const n = body.pull_request.number
  let actions = []
  const [owner, repo] = body.repository.full_name.split('/')
  const commonData = {
    owner,
    repo,
    n,
    whId: body.whId,
    botId: body.botId,
    groupId: body.groupId,
    type: ''
  }
  const cardProps = {
    id: 'githubCommentInput1',
    data: parse({
      ...commonData,
      ...commonEventData,
      actionTitle: 'Add Comment',
      action: 'add-comment-pr'
    })
  }
  const card = commentSetsTempRender(cardProps)
  const commentAction = {
    type: 'Action.ShowCard',
    title: 'Add comment',
    card
  }
  const ref = body.comment || body.review
  if (ref) {
    const cardProps2 = {
      ...copy(cardProps),
      id: 'githubCommentInput2',
      value: markdownQuote(body.comment.body)
    }
    const card2 = commentSetsTempRender(cardProps2)
    const commentAction2 = {
      ...copy(commentAction),
      title: 'Quote reply',
      card: card2,
      sep: ','
    }
    actions = [commentAction2, commentAction]
  } else if (action === 'closed') {
    actions = [{
      title: 'Reopen',
      type: 'Action.Submit',
      data: parse({
        ...commonData,
        ...commonEventData,
        actionTitle: 'Reopen',
        action: 'reopen-pr'
      }),
      sep: ','
    }, commentAction]
  } else if (action === 'deleted' || action === 'locked') {
    actions = []
  } else {
    actions = [{
      type: 'Action.Submit',
      title: 'Close',
      data: parse({
        ...commonData,
        ...commonEventData,
        actionTitle: 'Close',
        action: 'close-pr'
      }),
      sep: ','
    },
    commentAction]
  }
  ext.actions = actions
  const all = createCommonProps(body, ext)
  all.columnSets = columnSetsTempRender({ columns })
  all.actions = actionsTempRender({
    actions,
    hasActions: !!actions.length
  })
  all.fallbackText = fallbackText
  const str = body.comment || body.review
    ? commentTempRender(all)
    : prTempRender(all)
  // console.log('----')
  // console.log(str)
  // console.log('----')
  const r = {
    ...commonEventData,
    attachments: [
      JSON.parse(str)
    ]
  }
  return r
}

export function formHook (body) {
  const title = 'New GitHub Webhook Created'
  const ext = {
    title,
    fallbackText: title,
    body: `Events: ${body.hook.events.join(', ')}`
  }

  return formCommon(body, ext)
}

function commitRender (c) {
  return `- [${c.message}](${c.url})`
}

export function formPush (body) {
  const msg = parse(_.get(body, 'commits[0].message'))
  const titleStr = msg
    ? `: \\"[${msg}](${body.compare})\\"`
    : ''
  const title = msg
    ? `: \\"${msg}\\"`
    : ''
  const ext = {
    icon: icons.push,
    title: `New Push${titleStr}`,
    bodyTitle: 'Push message'
  }
  const all = createCommonProps(body, ext)
  all.fallbackText = `New Push${title}`
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
    ...commonEventData,
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
    fallbackText: `New event: ${title}${action}`,
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
      hasActions: !!(extend.actions && extend.actions.length),
      actions: extend.actions
    })
    : ''
  return {
    desc,
    title: titleStr,
    fallbackText: extend.fallbackText,
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
      url: FEEDBACK_URL,
      icon: icons.feedback
    })
  }
}

export function formCommon (body, extend = {}) {
  const props = createCommonProps(body, extend)
  const all = commonTempRender(props)
  const r = {
    ...commonEventData,
    // title: `[${title}](${url})`,
    attachments: [
      JSON.parse(all)
    ]
  }
  return r
}
