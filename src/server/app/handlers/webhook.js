/**
 * handle github webhook
 */

import { Webhook } from '../models/webhook'
import {
  formHook,
  formStar,
  formRelease,
  formIssue,
  formPr,
  formPush,
  formAct,
  formCommon
} from './formatter'
import axios from 'axios'
import _ from 'lodash'

export const repositoryEventProps = [
  'action',
  'repository',
  'organization',
  'installation',
  'sender'
]

export function getWebhook (uid) {
  return Webhook.findByPk(uid)
}

export function postMessage (url, data) {
  return axios.post(url, data, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(r => r.data)
}

function transform (body) {
  // console.log('========')
  // console.log(JSON.stringify(body, null, 2))
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

export default async function webhook2 (req, res) {
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
  // console.log('-----')
  // console.log(JSON.stringify(req.body, null, 2))
  // console.log('-----')
  const data = transform({
    ...req.body,
    whId: id
  })
  // console.log('-----')
  // console.log(JSON.stringify(data, null, 2))
  // console.log('-----')
  if (!data) {
    res.send('skip')
    return 'skip'
  }
  // console.log('webhook', wh.rc_webhook, r.data)
  const x = await postMessage(wh.rc_webhook, data)
  console.log('x', x)
  res.send(x)
}
