
export default function eventHandler ({
  type, // could be 'BotAdded', 'BotRemoved', 'Message4Bot', 'BotGroupLeft', 'BotJoinGroup', 'Maintain', 'SetupDatabase'
  bot, // the bot instance, check src/models/Bot.ts for instance methods
  text, // the text message user posted in chatgroup
  group, // the group object, can get chat group id from group.id
  userId, // message creator's id
  message // message object, check ringcentral api document for detail
}) {
  console.log(
    '========'
  )
  console.log(
    type,
    bot,
    text,
    group,
    userId,
    message
  )
  console.log(
    '========'
  )
  // bot.sendMessage(groupId, body)
  if (type === 'BotJoinGroup') {
    bot.sendAdaptiveCard(group.id, {
      $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
      type: 'AdaptiveCard',
      version: '1.3',
      body: [
        {
          type: 'TextBlock',
          text: 'hello!',
          size: 'large'
        },
        {
          type: 'TextBlock',
          text: 'I am a chat bot',
          weight: 'bolder'
        }
      ]
    })
  } else if (type === 'Message4Bot') {
    bot.sendAdaptiveCard(group.id, {
      $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
      type: 'AdaptiveCard',
      version: '1.3',
      body: [
        {
          type: 'TextBlock',
          text: 'hello!',
          size: 'large'
        },
        {
          type: 'TextBlock',
          text: 'You posted: ' + text,
          weight: 'bolder'
        }
      ]
    })
  }

  // bot.updateAdaptiveCard(postId, body)
}
