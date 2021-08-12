import { commentTemp } from '../templates/comment'
import { commonTemp } from '../templates/common'
import { prTemp } from '../templates/pr'
import { pushTemp } from '../templates/push'
import { releaseTemp } from '../templates/release'
import { issueTemp } from '../templates/issue'
import { actionsTemp } from '../templates/parts/actions'
import { assetsTemp } from '../templates/parts/assets'
import { authorTemp } from '../templates/parts/author'
import { columnSetsTemp } from '../templates/parts/column-sets'
import { commitsTemp } from '../templates/parts/commits'
import { feedbackTemp } from '../templates/parts/feedback'
import { repoTemp } from '../templates/parts/repo'
import { titleTemp } from '../templates/parts/title'
import { descTemp } from '../templates/parts/desc'
import { authTemp } from '../templates/auth'
import { messageTemp } from '../templates/message'

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
