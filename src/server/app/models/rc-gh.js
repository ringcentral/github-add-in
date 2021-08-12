/**
 * ringcentral id and github id mapping
 */

import Sequelize from 'sequelize'
import sequelize from './sequelize'

export const RCGH = sequelize.define('GithubForGlipIntegrationRCGH', {
  id: { // this is rc extension id
    type: Sequelize.STRING,
    primaryKey: true
  },
  gh_id: { // this is github table id
    type: Sequelize.STRING
  },
  token: { // this is github table id
    type: Sequelize.STRING
  },
  verified: {
    type: Sequelize.INTEGER
  }
})
