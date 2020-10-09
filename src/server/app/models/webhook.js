import Sequelize from 'sequelize'
import { generate } from 'shortid'
import sequelize from './sequelize'

export const Webhook = sequelize.define('GithubForGlipIntegrationWebhook', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
    defaultValue: generate
  },
  gh_user_id: {
    type: Sequelize.STRING
  },
  gh_user: {
    type: Sequelize.STRING
  },
  rc_webhook: {
    type: Sequelize.STRING
  },
  gh_webhook_id: {
    type: Sequelize.STRING
  },
  gh_org: {
    type: Sequelize.STRING
  },
  gh_repo: {
    type: Sequelize.STRING
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
