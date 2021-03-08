/**
 * post message lib
 */

export class PostMessageApp {
  handle (channel, handler) {
    this.handler = this.createHandler(channel, handler)
    window.addEventListener('message', this.handler)
  }

  createHandler (channelName, handler) {
    return (e) => {
      const {
        channel
      } = e
      if (channel !== channelName) {
        return false
      }
      handler(e)
    }
  }

  send (channel, data) {
    window.parent.postMessage({
      channel,
      data
    }, window.location.origin)
  }

  dispose () {
    window.removeEventListener('message', this.handler)
  }
}
