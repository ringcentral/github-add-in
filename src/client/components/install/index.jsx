import { useState, useEffect } from 'react'
import { Button, Spin } from 'antd'
import { LoginOutlined, LogoutOutlined } from '@ant-design/icons'
import fetchUser from '../../common/get-user'
import logoutFunc from '../../common/logout'
import './install.styl'

export default function Install () {
  const { server } = window.rc
  const [state, setState] = useState({
    fetchingUser: false,
    user: {}
  })
  const {
    fetchingUser,
    user
  } = state
  async function logout (e) {
    e.preventDefault()
    setter({
      fetchingUser: true
    })
    await logoutFunc()
  }
  async function fetchUserInfo () {
    setter({
      fetchingUser: true
    })
    const userInfo = await fetchUser()
    if (userInfo && userInfo.result && userInfo.result.id) {
      setter({
        user: userInfo.result
      })
    }
    setter({
      fetchingUser: false
    })
  }
  async function initApp () {
    fetchUserInfo()
  }
  useEffect(() => {
    initApp()
  }, [])
  function setter (update) {
    setState(old => {
      return {
        ...old,
        ...update
      }
    })
  }
  function renderSettingBtn () {
    return (
      <p>
        <a href={server + '/options?webhook=' + window.rc.query.webhook}>
          <Button
            type='primary'
            size='large'
          >
            Select repos and events
          </Button>
        </a>
      </p>
    )
  }
  function renderTitle () {
    const logo = 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
    return (
      <div>
        <div className='pd2b aligncenter'>
          <img
            className='iblock gh-logo'
            src={logo}
          />
          <h1>
            Github notification app for RingCentral
          </h1>
        </div>
      </div>
    )
  }
  function renderLogined () {
    const red = encodeURIComponent(
      window.location.href
    )
    const url = `${server}/logout?redirect=${red}`
    return (
      <div className='outer'>
        <div className='aligncenter wrap'>
          {renderTitle()}
          <p>
            You already authorized the app with your GitHubAccount: <b>{user.email}</b>. you can
            <a
              href='#'
              className='iblock mg1l'
              onClick={logout}
            >
              <LogoutOutlined /> logout
            </a> so you can login with another account.
          </p>
          {renderSettingBtn()}
        </div>
      </div>
    )
  }
  function renderNotLogined () {
    const url = window.rc.authUrlDefault.replace(
      window.rc.defaultState,
      encodeURIComponent(window.rc.query.webhook)
    )
    return (
      <div className='aligncenter wrap'>
        {renderTitle()}
        <Spin spinning={fetchingUser}>
          <div className='pd1b pd1t'>
            <a href={url}>
              <Button
                icon={<LoginOutlined />}
                type='primary'
                size='large'
              >
                Authorization with GitHub
              </Button>
            </a>
          </div>
        </Spin>
      </div>
    )
  }
  const logined = !!user.id
  return logined
    ? renderLogined()
    : renderNotLogined()
}
