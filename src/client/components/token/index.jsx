
import { Tooltip, Input, message } from 'antd'
import { CopyOutlined } from '@ant-design/icons'
import '../../css/basic.styl'
import './token.styl'

export default function Test () {
  const copy = (txt) => {
    const copyText = document.getElementById('copy')
    copyText.value = txt
    copyText.select()
    copyText.setSelectionRange(0, 99999)
    document.execCommand('copy')
    message.success('Copied')
  }

  const token = window.localStorage.getItem('rc-auth-token')
  const verified = window.localStorage.getItem('rc-verified')
  if (verified) {
    return (
      <div className='main-body'>
        <p>You already authorized</p>
      </div>
    )
  }
  return (
    <div className='main-body'>
      <p>Paste this token into your RingCentral chat message input to authorize</p>
      <p>
        <Input
          value={token}
          id='copy'
          addonAfter={
            <Tooltip
              title='Copy token'
            >
              <CopyOutlined
                className='copy-icon mg1l'
                onClick={() => {
                  copy(token)
                }}
              />
            </Tooltip>
          }
        />
      </p>
    </div>
  )
}
