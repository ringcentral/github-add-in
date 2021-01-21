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

const inIframe = window.top !== window

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
    currentOrg,
    currentRepo,
    switchWebhookList,
    handleSwitchFilter,
    filterWebhook
  } = props
  if (showList) {
    return (
      <List
        delWebhook={delWebhook}
        webhooks={webhooks}
        filterWebhook={filterWebhook}
        handleSwitchFilter={handleSwitchFilter}
        switchWebhookList={switchWebhookList}
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
            currentOrg={currentOrg}
            currentRepo={currentRepo}
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
          {
            !inIframe
              ? (
                <Button
                  type='primary'
                  disabled={disabled}
                  onClick={submit}
                >
                  Submit
                </Button>
              )
              : null
          }
          <span
            className='pointer goto-list iblock mg2l'
            onClick={() => switchWebhookList(true)}
          >
            <UnorderedListOutlined /> Webhook List
          </span>
          <span
            className='pointer logout fright'
            onClick={logout}
          >
            <LogoutOutlined /> Logout
          </span>
        </div>
      </div>
    </div>
  )
}
