/**
 * ui module for repo select
 */

import { useState } from 'react'
import { Input } from 'antd'
import { ReloadOutlined } from '@ant-design/icons'

const { Search } = Input

export default function Repos (props) {
  const [keyword, setKw] = useState('')
  function handleKw (e) {
    setKw(e.target.value)
  }
  function renderItem (repo) {
    const {
      id,
      full_name: name,
      description,
      avatar_url: url
    } = repo
    return (
      <div
        className='item'
        key={id}
        title={description || name}
        onClick={() => props.onClick(repo)}
      >
        <img src={url} className='avatar' />
        <span className='iblock mg1l bold'>{name}</span>
      </div>
    )
  }
  const arr = keyword
    ? props.repos.filter.filter(f => f.full_name.toLowerCase().includes(keyword.toLowerCase()))
    : props.repos
  return (
    <div className='repos'>
      <h2>Select Repositories</h2>
      <div className='repo-search'>
        <Search
          value={keyword}
          onChange={handleKw}
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
