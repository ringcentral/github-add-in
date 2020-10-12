/**
 * webhook list UI
 */

/**
 * ui module for repo select
 */

import { CloseCircleOutlined, RollbackOutlined } from '@ant-design/icons'
import { Tag, Popconfirm, List } from 'antd'
import eventsList from '../../common/github-events'

const { Item } = List
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
      <Item
        key={id}
        actions={[
          <Popconfirm
            title='Are you sure about deleting this?'
            onConfirm={() => props.delWebhook(item)}
            okText='Yes'
            cancelText='No'
            key='del-item-conf'
          >
            <CloseCircleOutlined
              className='pointer del-webhook-icon'
            />
            <span className='mg1l'>Delete</span>
          </Popconfirm>
        ]}
      >
        <Item.Meta
          title={repo.full_name}
          description={(
            <p>
              {
                (events || '').split(',').map(renderEvent)
              }
            </p>
          )}
        />
      </Item>
    )
  }
  return (
    <div className='webhook-list main-wrap'>
      <div className='steps-head'>
        <div className='pd2 bold font16'>
          <span className='iblock'>Webhook List</span>
          <RollbackOutlined
            className='pointer mg2l iblock font14'
            onClick={() => props.switchWebhookList(false)}
          />
        </div>
      </div>
      <div className='steps-content'>
        <div className='main-body'>
          <List
            dataSource={props.webhooks}
            renderItem={renderItem}
            size='small'
            bordered
          />
        </div>
      </div>
    </div>
  )
}
