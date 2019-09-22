import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtInput, AtInputNumber, AtButton } from 'taro-ui'
import { post } from '../../http/api'
import { formatDate, formatTime, getTimeInMills } from '../../utils/util'
import './create.scss'

export default class Create extends Component {

  config = {
    navigationBarTitleText: '发起事件'
  }

  constructor () {
    super(...arguments)
    let current = new Date()
    let date = formatDate(current)
    let time = formatTime(current)
    this.state = {
      typeSelector: ['全部', '休闲', '运动', '游玩', '学习', '交友', '社团', '其他'], 
      scopeSelector: ['全部可见', '同校可见', '同校不可见'], 
      typeSel: 0, 
      title: '',
      place: '',
      scopeSel: 0,
      minPeople: 1, 
      maxPeople: 1,
      startDateSel: date,
      startTimeSel: time,
      endDateSel: date,
      endTimeSel: time,
      deadlineDateSel: date,
      deadlineTimeSel: time,
      wxNum: '',
      remark: ''
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
  onTypeChange = e => {
    this.setState({
      typeSel: e.detail.value
    })
  }
  onScopeChange = e => {
    this.setState({
      scopeSel: e.detail.value
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
  onDeadlineDateChange = e => {
    this.setState({
      deadlineDateSel: e.detail.value
    })
  }
  onDeadlineTimeChange = e => {
    this.setState({
      deadlineTimeSel: e.detail.value
    })
  }
  onWXNumChange = (value) => {
    this.setState({
      wxNum: value
    })
  }
  onRemarkChange = (value) => {
    this.setState({
      remark: value
    })
  }
  onSubmitForm = e => {
    if (!this.checkParams()) {
      return;
    }
    post("/event/save", true, {
        title: this.state.title,
        destination: this.state.place,
        maxUserNum: this.state.maxPeople,
        minUserNum: this.state.minPeople,
        startTime: getTimeInMills(this.state.startDateSel, this.state.startTimeSel),
        endTime: getTimeInMills(this.state.endDateSel, this.state.endTimeSel),
        remarks: this.state.remark,
        type: this.state.typeSel, 
        scope: this.state.scopeSel
    }).then((result) => {
        console.log("publish success: " + result)
    }).catch((error) => {
        console.error("publish error: " + error)
    })
  }

  checkParams = () => {
    var pass = false
    var errorMsg = ''
    if (this.state.title == '') {
      errorMsg = '标题是必填项！'
    } else if (this.state.place == '') {
      errorMsg = '地点是必填项！'
    } else if (this.state.maxPeople < this.state.minPeople) {
      errorMsg = '最高人数不能低于最低人数！'
    } else if (getTimeInMills(this.state.startDateSel, this.state.startTimeSel) - new Date().getTime() < 60 * 60 * 1000) {
      errorMsg = '开始时间至少要比当前时间晚一个小时！'
    } else if (getTimeInMills(this.state.startDateSel, this.state.startTimeSel) > getTimeInMills(this.state.endDateSel, this.state.endTimeSel)) {
      errorMsg = '结束时间不能早于开始时间！'
    } else if (this.state.wxNum == '') {
      errorMsg = '微信号是必填项！'
    } else {
      pass = true
    }

    if (!pass) {
      Taro.showToast({
        title: errorMsg,
        icon: 'none',
      })
    }
    return pass;
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
                    <Text className='event-prop-key'>类型</Text>
                    <Picker className='event-prop-value'
                        mode='selector' 
                        range={this.state.typeSelector}
                        onChange={this.onTypeChange}>
                        <View className='picker'>
                            {this.state.typeSelector[this.state.typeSel]}
                        </View>
                    </Picker>
                </View>
                <View className='prop-divide-line'/>
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
                    <Text className='event-prop-key'>可见范围</Text>
                    <Picker className='event-prop-value'
                        mode='selector' 
                        range={this.state.scopeSelector}
                        onChange={this.onScopeChange}>
                        <View className='picker'>
                            {this.state.scopeSelector[this.state.scopeSel]}
                        </View>
                    </Picker>
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
                    <Text className='event-prop-key'>截止时间</Text>
                    <Picker className='event-prop-value'
                        mode='date' 
                        onChange={this.onDeadlineDateChange}>
                        <View className='picker'>
                            {this.state.deadlineDateSel}
                        </View>
                    </Picker>
                    <Picker className='event-prop-value'
                        mode='time' 
                        onChange={this.onDeadlineTimeChange}>
                        <View className='picker'>
                            {this.state.deadlineTimeSel}
                        </View>
                    </Picker>
                </View>
                <View className='prop-divide-line'/>
                <View className='event-prop-layout'>
                    <Text className='event-prop-key'>微信号</Text>
                    <AtInput className='event-prop-value'
                        border={false}
                        placeholder='填写你的微信号'
                        onChange={this.onWXNumChange.bind(this)}/>
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
