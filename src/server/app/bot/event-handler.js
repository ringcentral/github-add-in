import {
  botJoin,
  handleMessage
} from './bot-logic'

export default async function eventHandler ({
  type, // could be 'BotAdded', 'BotRemoved', 'Message4Bot', 'BotGroupLeft', 'BotJoinGroup', 'Maintain', 'SetupDatabase'
  bot, // the bot instance, check src/models/Bot.ts for instance methods
  text, // the text message user posted in chatgroup
  group, // the group object, can get chat group id from group.id
  userId, // message creator's id
  message // message object, check ringcentral api document for detail
}) {
  // console.log(
  //   '========'
  // )
  // console.log(
  //   type,
  //   bot,
  //   text,
  //   group,
  //   userId,
  //   message
  // )
  // console.log(
  //   '========'
  // )
  // bot.sendMessage(groupId, body)
  if (type === 'BotJoinGroup') {
    await botJoin(bot, group)
  } else if (type === 'Message4Bot') {
    await handleMessage(
      bot,
      group,
      text,
      userId,
      message
    )
  }
}
