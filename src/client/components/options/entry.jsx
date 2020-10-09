/**
 * entry for user to select new webhook or
 * check webhook list
 */

import { Spin, Button } from 'antd'

export default function Entry (props) {
  const {
    loadingUser
  } = props
  return (
    <Spin spinning={loadingUser}>
      <div className='main-body aligncenter pd3'>
        <a href={props.authUrl}>
          <Button size='large' type='primary'>
            Connect to GitHub
          </Button>
        </a>
      </div>
    </Spin>
  )
}
