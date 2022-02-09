/**
 * track card need updated
 */

import Sequelize from 'sequelize'
import sequelize from './sequelize'

export const CardUpdateRef = sequelize.define('CardUpdateRef', {
  id: { // this is ref id
    type: Sequelize.STRING,
    primaryKey: true
  },
  cardId: { // this is card id
    type: Sequelize.STRING
  },
  botId: { // this is card id
    type: Sequelize.STRING
  },
  data: { // all other data associcated with this user
    type: Sequelize.JSON
  }
})
