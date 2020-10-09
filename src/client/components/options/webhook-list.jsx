/**
 * webhook list UI
 */

/**
 * ui module for repo select
 */

import { CloseCircleOutlined, RollbackOutlined } from '@ant-design/icons'
import { Spin, Tag, Popconfirm } from 'antd'
import eventsList from '../../common/github-events'

const arr = eventsList()
const tree = arr.reduce((p, k) => {
  return {
    ...p,
    [k.id]: k
  }
}, {})

export default function WebhookList (props) {
  function renderEvent (evt) {
    const obj = tree[evt]
    return <Tag>{obj.name}</Tag>
  }
  function renderItem (item) {
    const {
      id,
      gh_repo: repo,
      gh_events: events
    } = item
    return (
      <div
        className='item'
        key={id}
        title={repo.full_name}
        onClick={() => props.onClick(item)}
      >
        <h3>
          {repo.full_name}
          <span className='fright'>
            <Popconfirm
              title='Are you sure about deleting this?'
              onConfirm={() => props.delWebhook(id)}
              okText='Yes'
              cancelText='No'
            >
              <CloseCircleOutlined
                onClick={() => props.delWebhook(id)}
                className='pointer del-webhook-icon'
              />
            </Popconfirm>
          </span>
        </h3>
        <p>
          {
            events.map(renderEvent)
          }
        </p>
      </div>
    )
  }
  return (
    <div className='webhook-list'>
      <h2>
        <span>Webhook List</span>
        <RollbackOutlined
          className='pointer mg1l'
        />
      </h2>
      <div className='repos-body'>
        {
          props.webhooks.map(renderItem)
        }
      </div>
    </div>
  )
}
