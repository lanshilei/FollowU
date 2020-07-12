import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtGrid } from 'taro-ui'
import { get, post } from '../../utils/request'
import { formatDate, formatTime } from '../../utils/datetime'
import { KEY_USER_ID, KEY_TOKEN, KEY_USERID } from '../../utils/global_data'
import defaultAvatar from '../../images/logo.jpg'
import './detail.scss'

export default class Detail extends Component {

  config = {
    navigationBarTitleText: '活动详情'
  }

  constructor() {
    super(...arguments)
    this.state = {
      eventId: -1, 
      currentUserId: -1,
      currentIsParticipant: false, 
      detail: {}, 
      feeTypes: ['免费', '付费', 'AA'], 
      owner: {}, 
      participants: []
    }
  }

  componentWillMount () { 
    let eventId = this.$router.params.id
    Taro.getStorage({ key: KEY_USERID }).then((res) => {
      this.setState({
        currentUserId: res.data, 
        eventId: eventId
      }, () => {
        this.loadEvent()
      })
    })
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  loadEvent() {
    get("/event/getByIds", true, { eventIds: this.state.eventId }).then((result) => {
      if (result.length == 1) {
        this.setState({
          detail: result[0]
        })
        this.loadParticipants()
      }
    }).catch((error) => {
      console.log("get event detail error: " + error)
    })
  }
  
  loadParticipants() {
    get("/userAndEvent/query", true, { eventIds: this.state.eventId, types: '0,1,2' })
      .then((result) => {
        let owner = {}
        let currentIsParticipant = false
        for (let i = 0; i < result.length; i++) {
          if (result[i].photo === null) {
            result[i].photo = defaultAvatar
          }
          if (result[i].type === 0) {
            owner = result[i]
          }
          if (result[i].userId === this.state.currentUserId) {
            currentIsParticipant = true
          }
        }
        this.setState({
          owner: owner,
          participants: result, 
          currentIsParticipant: currentIsParticipant
        })
      })
  }

  onJoinClick = () => {
    Taro.getStorage({ key: KEY_USERID }).then(res => {
      post("/userAndEvent/deal", true, {
        eventId: this.state.id,
        userId: res.data,
        op: 0
      }).then((result) => {
        Taro.showToast({
          title: '恭喜报名成功!', 
          icon: ''
        })
        this.loadParticipants()
      })
    }).catch((error) => {
      console.log("join event error: " + error)
      Taro.showToast({
        title: '报名失败！', 
        icon: 'none'
      })
    })
  }

  render () {
    let start = new Date(this.state.detail.startTime)
    let end = new Date(this.state.detail.endTime)
    let deadline = new Date(this.state.detail.registrationDeadline)
    let feeType = this.state.detail.feeType - 1;
    let fee = feeType == 0 ? '' : '- ' + this.state.detail.fee
    return (
      <View className='event-container'>
        <View className='event-image'>
          <Image src={this.detail.imgUrl}/>
        </View>
        <Text className='event-title'>{this.state.detail.title}</Text>

        <View className='event-layout'>
          <View className='event-detail'>
            <View className='event-prop'>
              <Text className='event-key'>活动费用：</Text>
              <Text className='event-value'>{this.state.feeTypes[feeType] + " " + fee}</Text>
            </View>
            <View className='event-prop'>
              <Text className='event-key'>时间：</Text>
              <Text className='event-value'>{formatDate(start) + ' ' + formatTime(start) + ' -\n' + formatDate(end) + ' ' + formatTime(end)}</Text>
            </View>
            <View className='event-prop'>
              <Text className='event-key'>地点：</Text>
              <Text className='event-value'>{this.state.detail.destination}</Text>
            </View>
            <View className='event-prop'>
              <Text className='event-key'>报名截止时间：</Text>
              <Text className='event-value'>{formatDate(deadline) + ' ' + formatTime(deadline)}</Text>
            </View>
            <View className='event-prop'>
              <Text className='event-key'>人数：</Text>
              <Text className='event-value'>{this.state.detail.minUserNum + "-" + this.state.detail.maxUserNum + "人"}</Text>
            </View>
          </View>
          <View className='event-share'>
            <Text className='btn-share'>分享活动</Text>
          </View>
        </View>

        <View className='owner-info'>
          <Image className='owner-avatar' src={this.state.owner.photo}/>
          <Text className='owner-name'>发起者留言</Text>
        </View>
        <Text className='owner-comment'>{this.state.detail.remarks}</Text>

        <Text className='participant-title'>参与活动人员</Text>
        <View className='at-row at-row--wrap'>
          {this.state.participants.map((item, i) => {
            return (
              <View className='at-col at-col-2' key={i}>
                <Image className='participant-avatar' src={item.photo}/>
              </View>
            );
          })}
        </View>

        {
          currentIsParticipant ? 
          <View /> : 
          <Text className='btn-join' onClick={this.onJoinClick.bind(this)}>参与活动</Text>
        }
      </View>
    )
  }
}
