import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtInput, AtInputNumber, AtButton } from 'taro-ui'
import { post } from '../../http/api'
import './create.scss'

export default class Create extends Component {

  config = {
    navigationBarTitleText: '发起事件'
  }

  constructor () {
    super(...arguments)
    this.state = {
      title: '',
      place: '',
      minPeople: 1, 
      maxPeople: 1,
      startDateSel: '2019-07-21',
      startTimeSel: '14:00',
      endDateSel: '2019-07-21',
      endTimeSel: '18:00'
    }
  }

  onTitleChange = (value) => {
    this.setState({
      title: value
    })
  }
  onPlaceChange = (value) => {
    this.setState({
      place: value
    })
  }
  onMinChange = (value) => {
    this.setState({
      minPeople: value
    })
  }
  onMaxChange = (value) => {
    this.setState({
      maxPeople: value
    })
  }
  onStartDateChange = e => {
    this.setState({
      startDateSel: e.detail.value
    })
  }
  onStartTimeChange = e => {
    this.setState({
      startTimeSel: e.detail.value
    })
  }
  onEndDateChange = e => {
    this.setState({
      endDateSel: e.detail.value
    })
  }
  onEndTimeChange = e => {
    this.setState({
      endTimeSel: e.detail.value
    })
  }
  onRemarkChange = (value) => {
    this.setState({
      remark: value
    })
  }
  onSubmitForm = e => {
    post("/event/save", true, {
        title: this.state.title,
        destination: this.state.place,
        maxUserNum: this.state.maxPeople,
        minUserNum: this.state.minPeople,
        startTime: this.getTimeInMillis(this.state.startDateSel, this.state.startTimeSel),
        endTime: this.getTimeInMillis(this.state.endDateSel, this.state.endTimeSel),
        remarks: this.state.remark,
        type: 0
    }).then((result) => {
        console.log("publish success: " + result)
    }).catch((error) => {
        console.error("publish error: " + error)
    })
  }

  getTimeInMillis = (data, time) => {
      return 1537326774000
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
        <View className='parent'> 
            <Text className='title-text'>发起一个事件：</Text>
            <View className='event-layout'>
                <View className='event-prop-layout'>
                    <Text className='event-prop-key'>标题</Text>
                    <AtInput className='event-prop-value'
                        border={false}
                        maxLength='15' 
                        placeholder='不超过15个字符'
                        onChange={this.onTitleChange.bind(this)}/>
                </View>
                <View className='prop-divide-line'/>
                <View className='event-prop-layout'>
                    <Text className='event-prop-key'>地点</Text>
                    <AtInput className='event-prop-value'
                        border={false}
                        placeholder='请输入活动地点'
                        onChange={this.onPlaceChange.bind(this)}/>
                </View>
                <View className='prop-divide-line'/>
                <View className='event-prop-layout'>
                    <Text className='event-prop-key'>最低人数</Text>
                    <AtInputNumber className='event-prop-value'
                        value={this.state.minPeople}
                        min={0}
                        max={100}
                        step={1}
                        onChange={this.onMinChange.bind(this)}/>
                </View>
                <View className='prop-divide-line'/>
                <View className='event-prop-layout'>
                    <Text className='event-prop-key'>最高人数</Text>
                    <AtInputNumber className='event-prop-value'
                        value={this.state.maxPeople}
                        min={0}
                        max={100}
                        step={1}
                        onChange={this.onMaxChange.bind(this)}/>
                </View>
                <View className='prop-divide-line'/>
                <View className='event-prop-layout'>
                    <Text className='event-prop-key'>开始时间</Text>
                    <Picker className='event-prop-value'
                        mode='date' 
                        onChange={this.onStartDateChange}>
                        <View className='picker'>
                            {this.state.startDateSel}
                        </View>
                    </Picker>
                    <Picker className='event-prop-value'
                        mode='time' 
                        onChange={this.onStartTimeChange}>
                        <View className='picker'>
                            {this.state.startTimeSel}
                        </View>
                    </Picker>
                </View>
                <View className='prop-divide-line'/>
                <View className='event-prop-layout'>
                    <Text className='event-prop-key'>结束时间</Text>
                    <Picker className='event-prop-value'
                        mode='date' 
                        onChange={this.onEndDateChange}>
                        <View className='picker'>
                            {this.state.endDateSel}
                        </View>
                    </Picker>
                    <Picker className='event-prop-value'
                        mode='time' 
                        onChange={this.onEndTimeChange}>
                        <View className='picker'>
                            {this.state.endTimeSel}
                        </View>
                    </Picker>
                </View>
                <View className='prop-divide-line'/>
                <View className='event-prop-layout'>
                    <Text className='event-prop-key'>微信号</Text>
                    <AtInput className='event-prop-value'
                        border={false}
                        placeholder='填写你的微信号，选填'/>
                </View>
                <View className='prop-divide-line'/>
                <View className='event-prop-layout'>
                    <Text className='event-prop-key'>留言</Text>
                    <AtInput className='event-prop-value'
                        border={false}
                        placeholder='说点什么吧...'
                        onChange={this.onRemarkChange.bind(this)}/>
                </View>
                <View className='prop-divide-line'/>

                <AtButton className='btn_submit'
                    type='primary'
                    onClick={this.onSubmitForm.bind(this)}
                >提交</AtButton>
            </View>
        </View>
    )
  }
}
