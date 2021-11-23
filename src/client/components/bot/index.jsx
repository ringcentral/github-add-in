import Index from '../main/index'

export default class Bot extends Index {
  isBot = true
  getAuthUrl = () => {
    const {
      groupId,
      botId
    } = window.rc.query
    return window.rc.authUrlDefault.replace(
      window.rc.defaultState,
      `auth:${groupId}:${botId}`
    )
  }

  isUserAuthed = user => {
    return user && user.result && user.result.id && user.result.rc_id
  }

  isAuthed = () => {
    const {
      id, rc_id: rcId
    } = this.state.user || {}
    return !!id && !!rcId
  }
}
