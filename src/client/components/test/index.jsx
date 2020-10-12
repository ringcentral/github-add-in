import { useState, useEffect, useRef } from 'react'
import { Button } from 'antd'
import { PostMessageManager } from '../../external/rc-postmessage'
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
    const now = +new Date()
    const x = await control.current.invoke(MESSAGE_CHANNEL.submitted)
      .catch(console.error)
    const now1 = +new Date()
    console.log('time used', now1 - now)
    console.log('submit result', x)
    setter(true)
  }
  const uri = window.rc.server + window.rc.home + '?webhook=' + window.rc.query.webhook
  function initEvents () {
    control.current = postMessage.create({
      contentWindow: document.getElementById('iframe').contentWindow,
      targetOrigin: window.location.origin
    })
    control.current.on(MESSAGE_CHANNEL.oauth, (data, ...args) => {
      console.log('data', data, ...args)
      setter(data.status)
    })
    // window.addEventListener('message', (e) => {
    //   console.log('out evet', e)
    // })
  }
  useEffect(() => {
    // initEvents()
  }, [])
  return (
    <div className='main'>
      <div className='iframe-box'>
        <iframe
          src={uri}
          id='iframe'
          onLoad={initEvents}
        />
      </div>
      <div className='btns pd2'>
        <Button
          disabled={!canSubmit}
          onClick={submit}
        >
          Submit
        </Button>
      </div>
    </div>
  )
}
