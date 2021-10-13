/**
 * ui module for event types
 */

import classnames from 'classnames'
import { Collapse } from 'antd'
import { CheckCircleOutlined } from '@ant-design/icons'

const { Panel } = Collapse

export default function Events (props) {
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
        key={id}
        className={cls}
        title={desc}
        onClick={() => props.onClick(event)}
      >
        <span className='iblock'>{name}</span>
        <CheckCircleOutlined className='check-icon iblock mg1l' />
      </div>
    )
  }
  const tree = props.eventTypes.reduce((p, e) => {
    const { cat = 'Others' } = e
    if (!p[cat]) {
      p[cat] = []
    }
    p[cat].push(e)
    return p
  }, {})
  const arr = Object.keys(tree).sort((a, b) => {
    return a > b ? 1 : -1
  })
  function renderPanel (key) {
    const evts = tree[key]
    return (
      <Panel key={key} header={key}>
        {
          evts.map(renderItem)
        }
      </Panel>
    )
  }
  const panel = (
    <Collapse defaultActiveKey={[arr[0]]}>
      {
        arr.map(renderPanel)
      }
    </Collapse>
  )
  return (
    <div className='events-types'>
      <div className='bold'>
        <span>Select Events ({props.selectedEvents.length}</span>
        <span className='mg1x'>/</span>
        <span className='mg1r'>{props.eventTypes.length})</span>
      </div>
      <div className='events-types-body'>
        {panel}
      </div>
    </div>
  )
}
