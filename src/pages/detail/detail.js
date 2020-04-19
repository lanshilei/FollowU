import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtGrid } from 'taro-ui'
import './detail.scss'

export default class Detail extends Component {

  config = {
    navigationBarTitleText: '活动详情'
  }

  constructor() {
    super(...arguments)
    this.state = {
      eventImage: 'http://www.dongao.com/upload/resources/image/2017/04/18/61906.jpg',
      title: '周末单车活动，小伙伴们约起来啊，骑行绕五环一周，快快报名吧！',
      costType: '免费',
      startTime: '2020-05-01 08:00',
      endTime: '2020-05-01 14:00',
      place: '永泰庄地铁站A口',
      deadline: '2020-4-30 18:00',
      minPeople: 6, 
      maxPeople: 10,
      ownerInfo: {
        avatr: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIk3q2KQ97RdDFoyae4aorgqyibCibIOVG4KLmXaKd95GQBp4IUwyrjUsjID5PVynRzRTKhXE53EN5A/132',
        name: '时代发廊'
      }, 
      comment: '2020年第一次活动，本次活动有好多小哥哥小姐姐，快来一起加入我们吧，一起迎接2020春天第一个活动~',
      participants: [
        'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIk3q2KQ97RdDFoyae4aorgqyibCibIOVG4KLmXaKd95GQBp4IUwyrjUsjID5PVynRzRTKhXE53EN5A/132',
        'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIk3q2KQ97RdDFoyae4aorgqyibCibIOVG4KLmXaKd95GQBp4IUwyrjUsjID5PVynRzRTKhXE53EN5A/132',
        'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIk3q2KQ97RdDFoyae4aorgqyibCibIOVG4KLmXaKd95GQBp4IUwyrjUsjID5PVynRzRTKhXE53EN5A/132',
        'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIk3q2KQ97RdDFoyae4aorgqyibCibIOVG4KLmXaKd95GQBp4IUwyrjUsjID5PVynRzRTKhXE53EN5A/132',
        'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIk3q2KQ97RdDFoyae4aorgqyibCibIOVG4KLmXaKd95GQBp4IUwyrjUsjID5PVynRzRTKhXE53EN5A/132',
        'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIk3q2KQ97RdDFoyae4aorgqyibCibIOVG4KLmXaKd95GQBp4IUwyrjUsjID5PVynRzRTKhXE53EN5A/132',
        'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIk3q2KQ97RdDFoyae4aorgqyibCibIOVG4KLmXaKd95GQBp4IUwyrjUsjID5PVynRzRTKhXE53EN5A/132',
        'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIk3q2KQ97RdDFoyae4aorgqyibCibIOVG4KLmXaKd95GQBp4IUwyrjUsjID5PVynRzRTKhXE53EN5A/132',
      ]
    }
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onJoinClick = () => {
    Taro.showToast({
      title: '对不起，你没有资格',
      icon: 'none',
    })
  }

  render () {
    return (
      <View className='event-container'>
        <View className='event-image'>
          <Image src={this.state.eventImage}/>
        </View>
        <Text className='event-title'>{this.state.title}</Text>

        <View className='event-layout'>
          <View className='event-detail'>
            <View className='event-prop'>
              <Text className='event-key'>活动费用：</Text>
              <Text className='event-value'>{this.state.costType}</Text>
            </View>
            <View className='event-prop'>
              <Text className='event-key'>时间：</Text>
              <Text className='event-value'>{this.state.startTime + ' -\n' + this.state.endTime}</Text>
            </View>
            <View className='event-prop'>
              <Text className='event-key'>地点：</Text>
              <Text className='event-value'>{this.state.place}</Text>
            </View>
            <View className='event-prop'>
              <Text className='event-key'>报名截止时间：</Text>
              <Text className='event-value'>{this.state.deadline}</Text>
            </View>
            <View className='event-prop'>
              <Text className='event-key'>人数：</Text>
              <Text className='event-value'>{this.state.minPeople + "-" + this.state.maxPeople + "人"}</Text>
            </View>
          </View>
          <View className='event-share'>
            <Text className='btn-share'>分享活动</Text>
          </View>
        </View>

        <View className='owner-info'>
          <Image className='owner-avatar' src={this.state.ownerInfo.avatr}/>
          <Text className='owner-name'>{this.state.ownerInfo.name + "(发起者)留言"}</Text>
        </View>
        <Text className='owner-comment'>{this.state.comment}</Text>

        <Text className='participant-title'>参与活动人员</Text>
        <View className='at-row at-row--wrap'>
          {this.state.participants.map((item, i) => {
            return (
              <View className='at-col at-col-2' key={i}>
                <Image className='participant-avatar' src={item}/>
              </View>
            );
          })}
        </View>

        <Text className='btn-join' onClick={this.onJoinClick.bind(this)}>参与活动</Text>
      </View>
    )
  }
}
