import Sequelize from 'sequelize'
import uid from '../common/uid'
import sequelize from './sequelize'

export const Service = sequelize.define('GithubForGlipIntegrationUsers', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
    defaultValue: uid
  },
  gh_user_info: {
    type: Sequelize.JSON
  },
  gh_token: {
    type: Sequelize.STRING
  },
  rc_id: {
    type: Sequelize.STRING
  },
  gh_scope: {
    type: Sequelize.STRING
  },
  enabled: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  webhooks: { // webhook ids
    type: Sequelize.STRING
  },
  bot_webhooks: { // webhook ids
    type: Sequelize.STRING
  },
  data: { // all other data associcated with this user
    type: Sequelize.JSON
  }
})
