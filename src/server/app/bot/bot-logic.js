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
import {
  FEEDBACK_URL,
  GITHUB_ICON_URL,
  icons
} from '../common/constants'
import parser from '../handlers/string-parser'
const { RINGCENTRAL_APP_SERVER } = process.env

function buildWelcomeMessage (bot, group) {
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
  const desc = parser(
    'I am GitHub bot, please click the "Click to config" button below to set GitHub repo events that will be send to this chat group, I will post this message again if you post any message and **AT** me'
  )
  const url = RINGCENTRAL_APP_SERVER +
    `/bot-config?groupId=${groupId}&botId=${bot.id}`
  const acts = [{
    type: 'Action.OpenUrl',
    title: 'Click to config',
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

export async function handleMessage (
  bot,
  group,
  text,
  userId,
  message
) {
  const msg = buildWelcomeMessage(bot, group)
  await bot.sendAdaptiveCard(group.id, msg)
}
