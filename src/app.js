import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index/index'
import { authLogin } from './utils/auth'

import 'taro-ui/dist/style/index.scss'
import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  config = {
    pages: [
      'pages/square/square',
      'pages/personal/personal',
      'pages/login/login',
      'pages/detail/detail',
      'pages/create/create'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: "#929292",
      selectedColor: "#2C2C2C",
      backgroundColor: "#FFFFFF",
      borderStyle: "black",
      list: [{
        pagePath: "pages/square/square",
        text: "广场",
        iconPath: "images/square.png",
        selectedIconPath: "images/square_selected.png"
      }, {
        pagePath: "pages/personal/personal",
        text: "我的",
        iconPath: "images/personal.png",
        selectedIconPath: "images/personal_selected.png"
      }]
    },
    permission: {
      "scope.userLocation": {
        "desc": "你的位置信息将用于小程序位置接口的效果展示"
      }
    }
  }

  componentDidMount () {
    authLogin()
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
