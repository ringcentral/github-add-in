/**
 * routes for github webhooks
 */

import { Webhook } from '../models/webhook'
import axios from 'axios'
import _ from 'lodash'

const FEEDBACK_URL = 'https://github.com/ringcentral/github-notification-app/issues/new'
const GITHUB_ICON_URL = 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
const baseURL = (name) => {
  return `https://raw.githubusercontent.com/ringcentral/github-notification-app/main/icons/${name}.png`
}
const icons = {
  comment: baseURL('comment'),
  issue: baseURL('issue-opened'),
  feedback: baseURL('feedback'),
  'green-check': baseURL('green-check'),
  pull: baseURL('pull-request'),
  push: baseURL('push'),
  release: baseURL('tag')
}

const repositoryEventProps = [
  'action',
  'repository',
  'organization',
  'installation',
  'sender'
]
function formatAction (action) {
  return action.replace(/_/g, ' ')
}

function formStar (body) {
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

function formRelease (body) {
  if (body.action !== 'published') {
    return ''
  }
  const url = body.release.html_url
  const type = ''
  const ext = {
    icon: 'release',
    title: `Release ${type}${formatAction(body.action)}: ${body.release.tag_name}`,
    title_link: url,
    body: `\n**Release Note:**\n ${body.release.body || 'No description'}`
  }
  return formCommon(body, ext)
}

function formIssue (body) {
  let url = body.issue.html_url
  let type = ''
  const isPull = /\/pull\/\d+$/.test(url)
  const title = isPull ? 'Pull request' : 'Issue'
  const cards = [{
    title,
    value: `[${body.issue.title}](${body.issue.html_url})`
  }]
  if (body.comment) {
    url = body.comment.html_url
    type = 'comment '
    if (body.comment.body) {
      cards.push({
        title: 'Comment body',
        value: body.comment.body
      })
    }
  }
  const bd = cards.map(d => {
    return `**${d.title}**: ${d.value}`
  }).join('\n')
  const ext = {
    icon: body.comment ? 'comment' : 'issue',
    title: `${title} ${type}${body.action}`,
    title_link: url,
    body: bd
  }

  return formCommon(body, ext, cards)
}

function formPr (body) {
  let type = ''
  let url = body.pull_request.html_url
  const cards = [{
    title: 'Pull request',
    value: `[${body.pull_request.title}](${body.pull_request.html_url})`
  }]
  if (body.review) {
    type = ' review'
    url = body.review.html_url
    if (body.review.body) {
      cards.push({
        title: 'Review body',
        value: body.review.body
      })
    }
  } else if (body.comment) {
    type = ' comment'
    url = body.comment.html_url
    if (body.comment.body) {
      cards.push({
        title: 'Comment body',
        value: body.comment.body
      })
    }
  }
  const bd = cards.map(d => {
    return `**${d.title}**: ${d.value}`
  }).join('\n')
  const ext = {
    icon: body.comment ? 'comment' : 'pull',
    title: `Pull Request${type} ${formatAction(body.action)}`,
    title_link: url,
    body: bd
  }
  return formCommon(body, ext)
}

function formHook (body) {
  const ext = {
    title: 'New GitHub Webhook Created',
    body: `* Events: ${body.hook.events.join(', ')}`
  }

  return formCommon(body, ext)
}

function formPush (body) {
  const ext = {
    icon: 'push',
    title: 'New Push event',
    title_link: body.compare
  }
  const cards = body.commits.map(c => {
    return `* [${c.message}](${c.url})`
  }).join('\n')
  ext.body = `\n**Commits**\n${cards}`
  return formCommon(body, ext)
}

function formAct (title, body, linkProp, actProp = 'action') {
  const link = linkProp
    ? _.get(body, linkProp)
    : undefined
  const act = body[actProp] || ''
  const action = act
    ? ` ${formatAction(act)}`
    : ''
  const ext = {
    title: `New event: ${title}${action}`,
    title_link: link
  }
  return formCommon(body, ext)
}

function formCommon (body, extend = {}) {
  const title = extend.title || 'New event!'
  const url = extend.title_link || body.repository.html_url
  const extra = extend.body ? '\n' + extend.body : ''
  const bd = `**Repository**: [${body.repository.full_name}](${body.repository.html_url})` + extra
  // const links = [
  //   {
  //     title: 'View Repo',
  //     url: body.repository.html_url
  //   },
  //   {
  //     title: 'View Author',
  //     url: body.sender.html_url
  //   }, ...(extend.links || [])
  // ]
  // const linkBody = links.map(d => `**[${d.title}](${d.url})**`).join('  ')
  const r = {
    // title: `[${title}](${url})`,
    icon: GITHUB_ICON_URL,
    body: `**[View in GitHub](${url})**`,
    attachments: [
      {
        title: `**[${title}](${url})**`,
        type: 'Card',
        color: '#000000',
        text: bd,
        author_name: body.sender.login,
        author_link: body.sender.html_url,
        author_icon: body.sender.avatar_url,
        footer: `[Feedback (Any suggestions, or issues about the github notification app?)](${FEEDBACK_URL})`,
        footer_icon: icons.feedback
      }
    ]
  }
  if (extend.icon) {
    r.attachments[0].thumb_url = icons[extend.icon]
  }
  if (!extend.title) {
    r.text = 'It is a event the Github Integration do not fully support, we will improve in future updates.'
  }
  return r
}

function transform (body) {
  // console.log('========')
  // console.log(body)
  // console.log('========')
  if (body.hook) {
    return formHook(body)
  } else if (body.starred_at) {
    return formStar(body)
  } else if (body.release) {
    return formRelease(body)
  } else if (body.issue) {
    return formIssue(body)
  } else if (body.pull_request) {
    return formPr(body)
  } else if (body.commits) {
    return formPush(body)
  } else if (body.check_run) {
    return formAct('Check run', body)
  } else if (body.check_suite) {
    return formAct('Check suite', body)
  } else if (body.alert) {
    return formAct('Alert', body)
  } else if (body.content_reference) {
    return formAct('Content reference', body)
  } else if (body.master_branch && body.ref) {
    return formAct('A Git branch or tag created', body)
  } else if (body.ref) {
    return formAct('A Git branch or tag deleted', body)
  } else if (body.key) {
    return formAct('Deploy key', body)
  } else if (body.deployment_status) {
    return formAct('Deployment Status', body)
  } else if (body.deployment) {
    return formAct('Deployment', body)
  } else if (body.forkee) {
    return formAct('Fork created', body, 'forkee.html_url')
  } else if (body.pages) {
    return formAct('Wiki created or updated', body, 'pages[0].html_url')
  } else if (body.label) {
    return formAct('Label', body)
  } else if (body.member) {
    return formAct('Member', body)
  } else if (body.milestone) {
    return formAct('Milestone', body)
  } else if (body.package) {
    return formAct('Package', body)
  } else if (body.build) {
    return formAct('Page build', body)
  } else if (body.project_card) {
    return formAct('Project card', body)
  } else if (body.project) {
    return formAct('Project', body, 'project.html_url')
  } else if (body.team) {
    return formAct('Team Added', body, 'team.html_url')
  } else if (body.project_column) {
    return formAct('Project column', body)
  } else if (body.state) {
    return formAct('Status of a Git commit changes', body, 'commit.html_url', 'state')
  } else if (body.package) {
    return formAct('Package', body, 'package.html_url')
  } else if (
    _.isEqual(Object.keys(body), repositoryEventProps)
  ) {
    return formAct('Repository', body)
  } else if (
    body.status && !body.installation
  ) {
    return formAct('Repository import', body, undefined, 'status')
  } else {
    return formCommon(body)
  }
}

function getWebhook (uid) {
  return Webhook.findByPk(uid)
}

const webhook = async (req, res) => {
  const {
    id
  } = req.params
  if (!id) {
    res.status(400)
    return res.send('id required')
  }
  const wh = await getWebhook(id)
  if (!wh) {
    res.status(404)
    return res.send('webhook not exist')
  }
  const data = transform(req.body)
  if (!data) {
    res.send('skip')
    return 'skip'
  }
  const r = await axios.post(wh.rc_webhook, data, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
  // console.log('webhook', wh.rc_webhook, r.data)
  res.send(r.data)
}

export default (app) => {
  app.post('/gh/webhook/:id', webhook)
}
