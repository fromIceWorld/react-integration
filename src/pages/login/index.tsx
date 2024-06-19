import { globalSystemTypeAtom } from '@/store/global'
import { useEmotionCss } from '@ant-design/use-emotion-css'
import { theme } from 'antd'
import classNames from 'classnames'
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'
import React, { useLayoutEffect } from 'react'
import { useRecoilValue } from 'recoil'
import AccountForm from './components/AccountForm'
import styles from './index.less'

const LOGINBGM = require('@/assets/images/common/login_bgm.mp4')

const { useToken } = theme

const Login: React.FC = () => {
  const { token } = useToken()
  const globalSystemTypeState = useRecoilValue(globalSystemTypeAtom)

  const rightClassName = useEmotionCss(() => {
    const padding = ['46px 75px 100px', '46px 48px 100px', '46px 24px 100px', '46px 24px 100px']
    return {
      padding: padding[globalSystemTypeState],
    }
  })

  const containerClassName = useEmotionCss(() => {
    const margin = ['0 75px', '0 75px', '0 45px', '0 16px']
    const height = ['600px', '600px', '600px', '600px']
    return {
      margin: margin[globalSystemTypeState],
      height: height[globalSystemTypeState],
    }
  })

  // useLayoutEffect(() => {
  //   const driverObj = driver({
  //     showProgress: true,
  //     stagePadding: 5,
  //     progressText: 'Step {{current}} of {{total}}',
  //     showButtons: ['next', 'previous'],
  //     steps: [
  //       {
  //         element: '#leftLogo',
  //         popover: {
  //           title: '很高兴认识你！',
  //           description: '来啦, 老弟！等你好久了！',
  //           side: 'bottom',
  //         },
  //       },
  //       {
  //         element: '#logo',
  //         popover: {
  //           title: '欢迎 Star🌟',
  //           description: '点击进入我的 GitHub 主页, 记得点个 🌟 哦',
  //           side: 'bottom',
  //         },
  //       },
  //       {
  //         element: '#username',
  //         popover: {
  //           title: '用户名',
  //           description: '默认用户名：admin',
  //           side: 'bottom',
  //         },
  //       },
  //       {
  //         element: '#password',
  //         popover: {
  //           title: '密码',
  //           description: '默认密码：admin123',
  //           side: 'bottom',
  //         },
  //       },
  //       {
  //         element: '#agreement',
  //         popover: {
  //           title: '阅读协议',
  //           description: '记得阅读协议哦',
  //           side: 'bottom',
  //         },
  //       },
  //       {
  //         element: '#submit',
  //         popover: {
  //           title: '点我吧',
  //           description: '点我就可以进入系统啦',
  //           side: 'bottom',
  //         },
  //       },
  //     ],
  //   })
  //   driverObj.drive()
  // }, [])

  return (
    <div className={styles['login-container']}>
      <div className={classNames(styles.container, containerClassName)}>
        <div className={classNames(styles['right-container'], rightClassName)}>
          <a href='https://github.com/fromIceWorld/react-integration' target='_blank' rel='noreferrer'>
            <div id='logo' className={styles.logo} />
          </a>
          <div className={styles['logo-tip']} style={{ color: token.colorPrimary }}>
            Welcome back
          </div>
          <div className={styles['logo-desc']} style={{ color: token.colorTextQuaternary }}>
            Sign in to continue
          </div>
          <AccountForm />
        </div>
      </div>
      <video className={styles['login-bgm']} src={LOGINBGM} autoPlay loop preload='' muted></video>
    </div>
  )
}

export default Login
