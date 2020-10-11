/**
 * ui module for event types
 */

import classnames from 'classnames'
import { CheckCircleOutlined } from '@ant-design/icons'

export default (props) => {
  function renderItem (event) {
    const {
      id,
      name,
      desc
    } = event
    const cls = classnames(
      'item',
      {
        selected: props.selectedEvents.includes(id)
      }
    )
    return (
      <div
        className={cls}
        key={id}
        onClick={() => props.onClick(event)}
      >
        <div className='bold mg1b'>
          {name}
          <CheckCircleOutlined className='check-icon fright' />
        </div>
        <div>{desc}</div>
      </div>
    )
  }
  return (
    <div className='events-types'>
      <h2>Select Events ({props.selectedEvents.length} / {props.eventTypes.length})</h2>
      <div className='events-types-body'>
        {
          props.eventTypes.map(renderItem)
        }
      </div>
    </div>
  )
}
