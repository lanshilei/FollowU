import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './square.scss'

export default class Square extends Component {

  config = {
    navigationBarTitleText: '广场'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='square'>
        <Text>这是首页</Text>
      </View>
    )
  }
}
