/**
 * steps control
 */

import { Steps } from 'antd'

const { Step } = Steps

export default function StepUi (props) {
  const arr = [
    {
      title: 'Organization'
    },
    {
      title: 'Repositories'
    },
    {
      title: 'Events'
    }
  ]
  return (
    <div className='steps'>
      <Steps current={props.step} onChange={props.onStepChange}>
        {
          arr.map(n => {
            return (
              <Step {...n} key={n.title} />
            )
          })
        }
      </Steps>
    </div>
  )
}
