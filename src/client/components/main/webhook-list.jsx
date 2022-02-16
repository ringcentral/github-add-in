/**
 * webhook list UI
 */

/**
 * ui module for repo select
 */

import { CloseCircleOutlined, EditOutlined } from '@ant-design/icons'
import { Tag, Popconfirm, List, Button, Radio } from 'antd'
import eventsList from '../../../server/app/common/github-events'
import WebhookEdit from './edit-webhook'

const { Item } = List
const arr = eventsList().filter(d => d)
const tree = arr.reduce((p, k) => {
  return {
    ...p,
    [k.id]: k
  }
}, {})

export default function WebhookList (props) {
  function renderEvent (evt) {
    const obj = tree[evt]
    if (!obj) {
      console.log('evt', evt, tree)
      return null
    }
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
          <EditOutlined
            className='pointer edit-webhook-icon'
            key='edit-item-conf'
            onClick={() => props.showEditWebhook(item)}
          />,
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
  const opts = [
    {
      value: 'current',
      label: 'Current'
    },
    {
      value: 'all',
      label: 'All'
    }
  ]
  const listProps = {
    updateWebhook: props.updateWebhook,
    hideEditWebhook: props.hideEditWebhook,
    visible: !!props.webhookEdit,
    webhook: props.webhookEdit,
    eventTypes: props.eventTypes
  }
  const filter = window.rc.isBot
    ? d => {
      return d.bot_id === window.rc.query.botId &&
        d.group_id === window.rc.query.groupId
    }
    : d => {
      return d.rc_webhook === window.rc.query.webhook
    }
  const data = props.filterWebhook === 'all'
    ? props.webhooks
    : props.webhooks.filter(filter)
  return (
    <div className='webhook-list main-wrap'>
      <div className='main-content'>
        <div className='pd2 bold font16 fix'>
          <span className='iblock mg3r'>Webhook List</span>
          <Radio.Group
            options={opts}
            onChange={props.handleSwitchFilter}
            value={props.filterWebhook}
            optionType='button'
          />
          <Button
            type='primary'
            className='font12 mg3l'
            onClick={() => props.switchWebhookList(false)}
          >
            Create new Webhook
          </Button>
        </div>
      </div>
      <div className='steps-contents'>
        <div className='main-body'>
          <List
            dataSource={data}
            renderItem={renderItem}
            size='small'
            bordered
          />
        </div>
      </div>
      <WebhookEdit
        {...listProps}
      />
    </div>
  )
}
