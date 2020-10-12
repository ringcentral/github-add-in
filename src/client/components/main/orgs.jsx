/**
 * ui module for orgs select
 */

import { useState } from 'react'
import { Input } from 'antd'
import { ReloadOutlined } from '@ant-design/icons'

const { Search } = Input

export default function Orgs (props) {
  const [keyword, setKw] = useState('')
  function handleKw (e) {
    setKw(e.target.value)
  }
  function renderItem (repo) {
    const {
      id,
      login,
      description,
      avatar_url: url
    } = repo
    return (
      <div
        className='item'
        key={id}
        title={description || login}
        onClick={() => props.onClick(repo)}
      >
        <img src={url} className='avatar' />
        <span className='iblock mg1l bold'>{login}</span>
      </div>
    )
  }
  const arr = keyword
    ? props.orgs.filter(f => f.login.toLowerCase().includes(keyword.toLowerCase()))
    : props.orgs
  return (
    <div className='repos'>
      <h2>Select Organization</h2>
      <div className='repo-search'>
        <Search
          value={keyword}
          onChange={handleKw}
          placeholder='search'
          className='search-input'
          addonBefore={(
            <ReloadOutlined
              className='reload-icon'
              title='reload'
              onClick={props.onReload}
            />
          )}
        />
      </div>
      <div className='repos-body'>
        {
          arr.map(renderItem)
        }
      </div>
    </div>
  )
}
