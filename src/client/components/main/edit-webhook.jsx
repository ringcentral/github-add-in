/**
 * edit webhook module
 */

//
import {
  Modal, message
} from 'antd'
import { PureComponent } from 'react'
import Events from './event-types'
import copy from 'json-deep-copy'

export default class EditWebhook extends PureComponent {
  state = {
    events: []
  }

  componentDidUpdate (prevProps) {
    if (prevProps.visible !== this.props.visible) {
      this.reset()
    }
  }

  reset = () => {
    const {
      visible,
      webhook
    } = this.props
    if (!visible) {
      return false
    }
    this.setState({
      events: webhook.gh_events.split(',')
    })
  }

  onOk = () => {
    const { events } = this.state
    if (!events.length) {
      return message.warn('At least select one event')
    }
    this.props.updateWebhook(copy(this.props.webhook), events)
  }

  onCancel = () => {
    this.props.hideEditWebhook()
  }

  handleClickEvent = (event) => {
    this.setState(old => {
      const { id } = event
      let arr = copy(old.events)
      if (arr.includes(id)) {
        arr = arr.filter(d => d !== id)
      } else {
        arr = [
          ...arr,
          id
        ]
      }
      return {
        events: arr
      }
    })
  }

  render () {
    const {
      visible
    } = this.props
    if (!visible) {
      return null
    }
    const modProps = {
      title: 'Edit Webhook',
      visible,
      onOk: this.onOk,
      onCancel: this.onCancel
    }
    return (
      <Modal
        {...modProps}
      >
        <Events
          onClick={this.handleClickEvent}
          eventTypes={this.props.eventTypes}
          selectedEvents={this.state.events}
        />
      </Modal>
    )
  }
}
