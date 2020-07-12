import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { authGetUserInfo } from '../../utils/auth'
import { post } from '../../utils/request'
import defaultAvatar from '../../images/logo.jpg'
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
      }, () => {
        this.uploadUserInfo()
      })
    }
   }

  componentDidHide () { }

  uploadUserInfo = e => {
    post("/user/update", true, {
      photo: this.state.userInfo.avatarUrl, 
      name: this.state.userInfo.nickName
    }).catch((error) => {
      console.log("update userInfo failed: " + error)
    })
  }

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
    let avatar = this.state.userInfo == undefined ? defaultAvatar : this.state.userInfo.avatarUrl
    return (
      <View className='personal-info'>
        <Image className='personal-avatar' src={this.state.userInfo.avatarUrl} />
        <Text className='personal-name'
          onClick={this.fillUserInfo.bind(this)}
        >{nickName}</Text>
      </View>
    )
  }
}
