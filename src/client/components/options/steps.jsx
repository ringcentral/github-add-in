/**
 * steps control
 */

import { Breadcrumb } from 'antd'

const { Item } = Breadcrumb

export default function StepUi (props) {
  const arr = [
    {
      title: 'Org',
      step: 0
    },
    {
      title: 'Repo',
      step: 1
    },
    {
      title: 'Events',
      step: 2
    }
  ]
  const arr2 = [
    props.currentOrg,
    props.currentRepo
  ]
  return (
    <div className='steps'>
      <Breadcrumb>
        {
          arr.map((n, i) => {
            let mod = null
            let extra = arr2[i]
            extra = extra
              ? ': ' + (extra.login || extra.name)
              : ''
            const all = n.title + extra
            if (n.step === props.step) {
              mod = <span className='bold current step elli'>{all}</span>
            } else if (n.step > props.step) {
              mod = <span className='bold step elli'>{all}</span>
            } else {
              mod = (
                <span
                  className='bold pointer link step elli'
                  onClick={() => props.onStepChange(n.step)}
                >
                  {all}
                </span>
              )
            }
            return (
              <Item key={n.title}>
                {mod}
              </Item>
            )
          })
        }
      </Breadcrumb>
    </div>
  )
}
