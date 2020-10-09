/**
 * main
 */

import Steps from './steps'
import Orgs from './orgs'
import Repos from './repos'
import Events from './event-types'
import List from './webhook-list'
import { Button } from 'antd'
import { UnorderedListOutlined, LogoutOutlined } from '@ant-design/icons'

export default function Main (props) {
  const {
    orgs,
    eventTypes,
    step,
    repos,
    onStepChange,
    fetchRepos,
    fetchOrgs,
    onClickOrg,
    onSelectEvent,
    selectedEvents,
    onClickRepo,
    showList,
    webhooks,
    delWebhook,
    submit,
    logout,
    switchWebhookList
  } = props
  if (showList) {
    return (
      <List
        delWebhook={delWebhook}
        webhooks={webhooks}
      />
    )
  }
  let mod = null
  if (step === 0) {
    mod = (
      <Orgs
        orgs={orgs}
        onReload={fetchOrgs}
        onClick={onClickOrg}
      />
    )
  } else if (step === 1) {
    mod = (
      <Repos
        repos={repos}
        onReload={fetchRepos}
        onClick={onClickRepo}
      />
    )
  } else {
    mod = (
      <Events
        eventTypes={eventTypes}
        selectedEvents={selectedEvents}
        onClick={onSelectEvent}
      />
    )
  }
  const disabled = !selectedEvents.length
  return (
    <div className='main-wrap'>
      <div className='steps-head'>
        <div className='main-body'>
          <Steps
            step={step}
            onStepChange={onStepChange}
          />
        </div>
      </div>
      <div className='steps-content'>
        <div className='main-body'>
          {mod}
        </div>
      </div>
      <div className='steps-footer'>
        <div className='main-body'>
          <Button
            type='primary'
            disabled={disabled}
            onClick={submit}
          >
            Submit
          </Button>
          <span
            className='pointer goto-list iblock mg2l'
            onClick={() => switchWebhookList(true)}
          >
            <UnorderedListOutlined /> Webhook List
          </span>
          <span
            className='pointer logout iblock mg2l'
            onClick={logout}
          >
            <LogoutOutlined /> Logout
          </span>
        </div>
      </div>
    </div>
  )
}
