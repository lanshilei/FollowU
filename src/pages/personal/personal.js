import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { authGetUserInfo } from '../../utils/auth'
import './personal.scss'

export default class Personal extends Component {

  config = {
    navigationBarTitleText: '我的'
  }

  constructor() {
    super(...arguments)
    this.state = {
      userInfo: undefined
    }
  }

  componentWillMount () { 
    this.fillUserInfo()
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () {
    const pages = getCurrentPages()
    const currPage = pages[pages.length - 1]
    if (currPage.data.userInfo) {
      this.setState({
        userInfo: currPage.data.userInfo
      })
    }
   }

  componentDidHide () { }

  fillUserInfo = e => {
    authGetUserInfo().then((info) => {
      this.setState({
        userInfo: info.userInfo
      })
    }).catch(() => {
    })
  }

  render () {
    let nickName = this.state.userInfo == undefined ? "未登录" : this.state.userInfo.nickName
    return (
      <View className='personal'>
        <Text
          onClick={this.fillUserInfo.bind(this)}
        >{nickName}</Text>
      </View>
    )
  }
}
