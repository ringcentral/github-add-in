import {
  GithubFilled,
  LinkOutlined
} from '@ant-design/icons'

export default function Footer () {
  const githubUrl = '//github.com/ringcentral/github-add-in/issues/new'
  return (
    <div className='pd3y footer'>
      <h2><GithubFilled /> GitHub bot for RingCentral app</h2>
      <p>
        <a
          href={`${githubUrl}/issues/new'`}
          target='_blank'
          rel='noopener noreferrer'
        >
          <LinkOutlined /> Feedback
        </a>
        <a
          className='mg1l'
          href={githubUrl}
          target='_blank'
          rel='noopener noreferrer'
        >
          <LinkOutlined /> GitHub repo
        </a>
        <a
          className='mg1l'
          href='https://www.ringcentral.com/apps/'
          target='_blank'
          rel='noopener noreferrer'
        >
          <LinkOutlined /> RingCentral App gallery
        </a>
      </p>
      <div className='pd1y'>
        <h3>
          <img src='//raw.githubusercontent.com/ringcentral/ringcentral-embeddable/master/src/assets/rc/icon.svg' className='iblock mg1r' alt='' />
          <span className='iblock'>RingCentral Labs</span>
        </h3>
        <p>RingCentral Labs is a program that lets RingCentral engineers, platform product managers and other employees share RingCentral apps they've created with the customer community. RingCentral Labs apps are free to use, but are not official products, and should be considered community projects - these apps are not officially tested or documented. For help on any RingCentral Labs app please consult each project's GitHub Issues message boards - RingCentral support is not available for these applications.</p>
      </div>
    </div>
  )
}
