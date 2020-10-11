import { useState, useEffect, useRef } from 'react'
import { Button } from 'antd'
import { PostMessageManager } from '../../external/rc-postmessage/dist/RcPostMessage.es5'
import './test.styl'
import { MESSAGE_CHANNEL } from '../../common/constants'

const postMessage = new PostMessageManager({
  debug: true
})

export default function Test () {
  const [canSubmit, setter] = useState(false)
  const control = useRef(null)
  async function submit () {
    setter(false)
    await control.current.invoke(MESSAGE_CHANNEL.submitted, {
      status: true
    })
    setter(true)
  }
  function initEvents () {
    // window.addEventListener('message', (e) => {
    //   console.log('out evet', e)
    // })
    control.current = postMessage.create({
      contentWindow: document.getElementById('iframe').contentWindow,
      targetOrigin: window.location.origin
    })
    control.current.handle(MESSAGE_CHANNEL.oauth, (data, ...args) => {
      console.log('data', data, ...args)
      setter(data.payload.status)
    })
  }
  useEffect(() => {
    initEvents()
  }, [])
  return (
    <div className='main'>
      <div className='iframe-box'>
        <iframe
          src={window.rc.server + '/options?webhook=' + window.rc.query.webhook}
          id='iframe'
        />
      </div>
      <div className='btns pd2'>
        <Button
          disabled={canSubmit}
          onClick={submit}
        >
          Submit
        </Button>
      </div>
    </div>
  )
}
