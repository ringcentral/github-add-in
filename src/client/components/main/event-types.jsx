/**
 * ui module for event types
 */

import classnames from 'classnames'
import { Tooltip } from 'antd'
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
      <Tooltip
        key={id}
        title={desc}
      >
        <div
          className={cls}
          onClick={() => props.onClick(event)}
        >
          <span className='iblock'>{name}</span>
          <CheckCircleOutlined className='check-icon iblock mg1l' />
        </div>
      </Tooltip>
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
