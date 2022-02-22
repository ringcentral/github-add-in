/**
 * handle message for bot
 */

import {
  titleTempRender,
  // descTempRender,
  botJoinTempRender,
  feedbackTempRender,
  actionsTempRender
} from '../handlers/templates'
import { User } from '../models/gh'
import {
  FEEDBACK_URL,
  GITHUB_ICON_URL,
  icons
} from '../common/constants'
import parser from '../handlers/string-parser'
import events from '../common/github-events'
import { create } from '../routes/db-webhook'
import { nanoid } from 'nanoid'
import { BotWebhook } from '../models/bot-webhook'
import { RCGH } from '../models/rc-gh'

const addCommands = [
  'add',
  'new',
  'create',
  '-n'
]
const githubEvents = events().map(t => t.id)
const { RINGCENTRAL_APP_SERVER } = process.env

function buildWelcomeMessage (bot, group, conf = {}) {
  const {
    isAuth, extraMessage
  } = conf
  const feedback = feedbackTempRender({
    title: 'Feedback',
    actions: true,
    url: FEEDBACK_URL,
    icon: icons.feedback
  })
  const groupId = group.id
  const title = titleTempRender({
    title: 'Hi team!',
    iconUrl: GITHUB_ICON_URL
  })
  const pre = extraMessage
    ? `**${extraMessage}**\n\n`
    : ''
  //   const desc = isAuth
  //     ? parser(
  //       'Please click **Authorize** button to authorize first before use bot command or interactive with card.')
  //     : parser(
  // `${pre}I am **GitHub bot**, please click the **Click to config** button below to set GitHub repo events that will be send to this chat group, I will post this message again if you post any message and **AT** me`)

  const desc = isAuth
    ? parser(
      'Please click **Authorize** button to authorize first before use bot command or interactive with card.')
    : parser(
    `${pre}I am **GitHub bot**, please click the **Click to config** button below to set GitHub repo events that will be send to this chat group, I will post this message again if you post any message and **AT** me

    You can also create webhook by command: eg: \`@GitHubBot add ringcentral/test-repo issues,pull_request\`, more bot commands detail please check [Create webhook from github bot command](https://github.com/ringcentral/github-add-in/wiki/Create-webhook-from-github-bot-command)`)

  const url = RINGCENTRAL_APP_SERVER +
    `/bot-config?groupId=${groupId}&botId=${bot.id}` +
    (isAuth ? '&action=auth' : '')
  const btnTitle = isAuth ? 'Authorize' : 'Click to config'
  const acts = [{
    type: 'Action.OpenUrl',
    title: btnTitle,
    url
  }]
  const actions = actionsTempRender({
    actions: acts,
    hasActions: true
  })
  return JSON.parse(botJoinTempRender({
    fallbackText: 'Hi Team, I am GitHub bot!',
    title,
    desc,
    feedback,
    actions
  }))
}

export async function botJoin (bot, group) {
  const msg1 = buildWelcomeMessage(bot, group)
  await bot.sendAdaptiveCard(group.id, msg1)
}

async function parseCommand (text, userId) {
  const arr = text.split(/ +/)
  const cmd = arr[0]
  const repoOrg = arr[1] || ''
  const eventsStr = arr[2] || ''
  const events = eventsStr.split(',').map(d => d.trim())
  const [org = '', repo = ''] = repoOrg.split('/')
  if (!addCommands.includes(cmd) || !events.length || !repo || !org) {
    return ''
  }
  if (
    events.find(e => {
      return !githubEvents.includes(e)
    })
  ) {
    return {
      error: 'Please make sure you use right event ids.'
    }
  }
  return {
    events,
    cmd,
    repo,
    org
  }
}

async function sendAuthMessage (bot, groupId) {
  const msg = buildWelcomeMessage(bot, { id: groupId }, {
    isAuth: true
  })
  await bot.sendAdaptiveCard(groupId, msg)
}

async function createWebhook (
  {
    events,
    repo,
    org
  },
  userId,
  bot,
  groupId
) {
  const ref = await RCGH.findByPk(userId)
  if (!ref) {
    await sendAuthMessage(bot, groupId)
    return true
  }
  const ghId = ref.gh_id
  const botId = bot.id
  const uid = nanoid(7)
  const req = {
    user: {
      id: ghId
    },
    path: '/bot-webhook',
    body: {
      gh_user_id: ghId,
      id: uid,
      gh_org: {
        login: org
      },
      gh_repo: {
        full_name: `${org}/${repo}`,
        login: repo,
        name: repo
      },
      gh_events: events.join(','),
      group_id: groupId,
      bot_id: botId
    }
  }
  await new Promise((resolve, reject) => {
    const res = {
      code: 200,
      send: msg => {
        if (res.code === 200) {
          resolve(msg)
        } else {
          reject(msg)
        }
      },
      status: (code) => {
        res.code = code
      }
    }
    create(req, res, bot)
  })
  const url = RINGCENTRAL_APP_SERVER + '/gh-bot/webhook/' + uid
  const userInst = await User.findByPk(ghId).catch(console.error)
  const r = userInst.gh.request({
    data: {
      config: {
        url,
        content_type: 'json',
        insecure_ssl: 0,
        digest: 1
      },
      events
    },
    method: 'POST',
    url: `/repos/${org}/${repo}/hooks`
  })
    .then(r => r.data)
    .catch(err => err.message)
  if (r && r.id) {
    const up = {
      gh_webhook_id: '' + r.id
    }
    await BotWebhook.update(up, {
      where: {
        id: uid
      }
    })
  }
}

export async function handleMessage (
  bot,
  group,
  text,
  userId,
  message
) {
  const conf = text && text.isAuth
    ? text
    : await parseCommand(text)
  if (conf && !conf.error) {
    await createWebhook(conf, userId, bot, group.id)
    return true
  }
  const config = conf && conf.error ? { extraMessage: conf.error } : {}
  const msg = buildWelcomeMessage(bot, group, config)
  // const msg = buildWelcomeMessage(bot, group, {})
  await bot.sendAdaptiveCard(group.id, msg)
}
