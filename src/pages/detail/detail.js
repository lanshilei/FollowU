import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtGrid } from 'taro-ui'
import './detail.scss'

export default class Square extends Component {

  config = {
    navigationBarTitleText: '详情'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='detail'>
        <View className='title-layout'>
            <Text className='title-text'>周日狼人杀，娱乐局，欢迎参加！</Text>
            <Text className='publish-time-text'>今天8:45</Text>
        </View>
        <View className='event-layout'>
            <View className='event-prop-layout'>
                <Text className='event-prop-key'>发起人</Text>
                <Text className='event-prop-value'>软件 兰石磊</Text>
            </View>
            <View className='prop-divide-line'/>
            <View className='event-prop-layout'>
                <Text className='event-prop-key'>集合时间</Text>
                <Text className='event-prop-value'>2019-07-14</Text>
            </View>
            <View className='prop-divide-line'/>
            <View className='event-prop-layout'>
                <Text className='event-prop-key'>集合地点</Text>
                <Text className='event-prop-value'>大大桌游吧</Text>
            </View>
            <View className='prop-divide-line'/>
            <View className='event-prop-layout'>
                <Text className='event-prop-key'>微信号</Text>
                <Text className='event-prop-value'>dadadebaba</Text>
            </View>
            <View className='prop-divide-line'/>
            <View className='event-prop-layout'>
                <Text className='event-prop-key'>发起人留言</Text>
                <Text className='event-prop-value'>软件第一预言家请战</Text>
            </View>
        </View>
        <AtGrid className='participant-grid'
            columnNum='4'
            hasBorder={false}
            data={
                [
                    {
                        image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
                        value: '兰石磊'
                    },
                    {
                        image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
                        value: '刁明达'
                    },
                    {
                        image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
                        value: '田熙颖'
                    },
                    {
                        image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
                        value: '徐俊东'
                    },
                    {
                        image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
                        value: '李岩'
                    },
                    {
                        image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
                        value: '张思卓'
                    },
                    {
                        iconInfo :{
                            size: 30,
                            color: 'blue',
                            value: 'add'
                        }
                    },
                ]
            }
        />
      </View>
    )
  }
}
