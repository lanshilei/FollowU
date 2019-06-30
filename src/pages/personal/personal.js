import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './personal.scss'

export default class Personal extends Component {

  config = {
    navigationBarTitleText: '我的'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='personal'>
        <Text>这是我的界面</Text>
      </View>
    )
  }
}
