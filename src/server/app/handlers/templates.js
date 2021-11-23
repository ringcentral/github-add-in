import { commentTemp } from '../templates/add-in/comment'
import { commonTemp } from '../templates/add-in/common'
import { prTemp } from '../templates/add-in/pr'
import { pushTemp } from '../templates/add-in/push'
import { releaseTemp } from '../templates/add-in/release'
import { issueTemp } from '../templates/add-in/issue'
import { actionsTemp } from '../templates/parts/actions'
import { assetsTemp } from '../templates/parts/assets'
import { authorTemp } from '../templates/parts/author'
import { columnSetsTemp } from '../templates/parts/column-sets'
import { commitsTemp } from '../templates/parts/commits'
import { feedbackTemp } from '../templates/parts/feedback'
import { repoTemp } from '../templates/parts/repo'
import { titleTemp } from '../templates/parts/title'
import { descTemp } from '../templates/parts/desc'
import { authTemp } from '../templates/add-in/auth'
import { messageTemp } from '../templates/add-in/message'
import { commentSetsTemp } from '../templates/parts/comment-sets'
import { botJoinTemp } from '../templates/bot/bot-join'

import temp from 'handlebars'

export const commentTempRender = temp.compile(commentTemp, { noEscape: true })
export const commonTempRender = temp.compile(commonTemp, { noEscape: true })
export const prTempRender = temp.compile(prTemp, { noEscape: true })
export const pushTempRender = temp.compile(pushTemp, { noEscape: true })
export const releaseTempRender = temp.compile(releaseTemp, { noEscape: true })
export const issueTempRender = temp.compile(issueTemp, { noEscape: true })
export const actionsTempRender = temp.compile(actionsTemp, { noEscape: true })
export const assetsTempRender = temp.compile(assetsTemp, { noEscape: true })
export const authorTempRender = temp.compile(authorTemp, { noEscape: true })
export const columnSetsTempRender = temp.compile(columnSetsTemp, { noEscape: true })
export const commitsTempRender = temp.compile(commitsTemp, { noEscape: true })
export const repoTempRender = temp.compile(repoTemp, { noEscape: true })
export const feedbackTempRender = temp.compile(feedbackTemp, { noEscape: true })
export const titleTempRender = temp.compile(titleTemp, { noEscape: true })
export const descTempRender = temp.compile(descTemp, { noEscape: true })
export const authTempRender = temp.compile(authTemp, { noEscape: true })
export const messageTempRender = temp.compile(messageTemp, { noEscape: true })
export const commentSetsTempRender = temp.compile(commentSetsTemp, { noEscape: true })
export const botJoinTempRender = temp.compile(botJoinTemp, { noEscape: true })
