/**
 * entry for user to select new webhook or
 * check webhook list
 */

import { Spin, Button } from 'antd'
import { GithubOutlined } from '@ant-design/icons'

export default function Entry (props) {
  const {
    loadingUser
  } = props
  return (
    <Spin spinning={loadingUser}>
      <div className='pd2t aligncenter'>To begin, please connect your GitHub account.</div>
      <div className='pd1b pd1t aligncenter'>
        <Button
          icon={<GithubOutlined />}
          type='primary'
          size='large'
          onClick={props.onAuth}
        >
          Connect to GitHub
        </Button>
      </div>
    </Spin>
  )
}
