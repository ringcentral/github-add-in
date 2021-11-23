import Sequelize from 'sequelize'
import { nanoid as generate } from 'nanoid'
import sequelize from './sequelize'

export const BotWebhook = sequelize.define('GithubForRCBotWebhook', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
    defaultValue: () => generate(10)
  },
  gh_user_id: {
    type: Sequelize.STRING
  },
  gh_user: {
    type: Sequelize.JSON
  },
  group_id: {
    type: Sequelize.STRING
  },
  bot_id: {
    type: Sequelize.STRING
  },
  gh_webhook_id: {
    type: Sequelize.STRING
  },
  gh_org: {
    type: Sequelize.JSON
  },
  gh_repo: {
    type: Sequelize.JSON
  },
  gh_events: {
    type: Sequelize.STRING
  },
  enabled: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  data: { // all other data associcated with this user
    type: Sequelize.JSON
  }
})
