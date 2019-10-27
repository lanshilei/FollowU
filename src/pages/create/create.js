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
    let oneHourLate = new Date(current.getTime() + 1000 * 60 * 60)
    let date = formatDate(oneHourLate)
    let time = formatTime(oneHourLate)
    let minDeadline = new Date(this.computeDeadlineScope(oneHourLate.getTime()))
    let minDate = formatDate(minDeadline)
    let minTime = formatTime(minDeadline)
    this.state = {
      typeSelector: ['全部', '休闲', '运动', '游玩', '学习', '交友', '社团', '其他'], 
      scopeSelector: ['全部可见', '同校可见', '同校不可见'], 
      minDeadlineDate: minDate,
      minDeadlineTime: minTime,
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
      deadlineDateSel: minDate,
      deadlineTimeSel: minTime,
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
    var minDeadline = new Date(this.computeDeadlineScope(getTimeInMills(e.detail.value, this.state.startTimeSel)))
    var minDate = formatDate(minDeadline)
    var minTime = formatTime(minDeadline)
    var currentDeadlineDate = this.state.deadlineDateSel
    var currentDeadlineTime = this.state.deadlineTimeSel
    if (getTimeInMills(currentDeadlineDate, currentDeadlineTime) < minDeadline) {
      currentDeadlineDate = minDate
      currentDeadlineTime = minTime
    }
    this.setState({
      startDateSel: e.detail.value, 
      minDeadlineDate: minDate, 
      minDeadlineTime: minTime,
      deadlineDateSel: currentDeadlineDate, 
      deadlineTimeSel: currentDeadlineTime
    })
  }
  onStartTimeChange = e => {
    var minDeadline = new Date(this.computeDeadlineScope(getTimeInMills(this.state.startDateSel, e.detail.value)))
    var minDate = formatDate(minDeadline)
    var minTime = formatTime(minDeadline)
    var currentDeadlineDate = this.state.deadlineDateSel
    var currentDeadlineTime = this.state.deadlineTimeSel
    if (getTimeInMills(currentDeadlineDate, currentDeadlineTime) < minDeadline) {
      currentDeadlineDate = minDate
      currentDeadlineTime = minTime
    }
    this.setState({
      startTimeSel: e.detail.value, 
      minDeadlineDate: minDate,
      minDeadlineTime: minTime, 
      deadlineDateSel: currentDeadlineDate,
      deadlineTimeSel: currentDeadlineTime
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
        registrationDeadline: getTimeInMills(this.state.deadlineDateSel, this.state.deadlineTimeSel),
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

  computeDeadlineScope = (startTime) => {
    let currentTime = new Date().getTime()
    let derta = startTime - currentTime
    let hour = 1000 * 60 * 60
    if (derta < hour) {
      return startTime
    } else if (derta >= hour && derta <= 2 * hour) {
      return startTime - 0.5 * hour
    } else if (derta > 2 * hour && derta <= 3 * hour) {
      return startTime - 0.75 * hour
    } else if (derta > 3 * hour && derta <= 4 * hour) {
      return startTime - 1 * hour
    } else if (derta > 4 * hour && derta <= 5 * hour) {
      return startTime - 1.5 * hour
    } else if (derta > 5 * hour && derta <= 6 * hour) {
      return startTime - 2 * hour
    } else if (derta > 6 * hour && derta <= 7 * hour) {
      return startTime - 2.5 * hour
    } else if (derta > 7 * hour && derta <= 16 * hour) {
      return startTime - 3 * hour
    } else if (derta > 16 * hour && derta <= 24 * hour) {
      return startTime - 4 * hour
    } else {
      let n = 12
      let i = 2
      while (!(derta > i * n * hour && derta <= (i + 1) * n * hour)) {
        i++
      }
      return startTime - (2 + i * 2) * hour
    }
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
                        value={this.state.startDateSel}
                        onChange={this.onStartDateChange}>
                        <View className='picker'>
                            {this.state.startDateSel}
                        </View>
                    </Picker>
                    <Picker className='event-prop-value'
                        mode='time' 
                        value={this.state.startTimeSel}
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
                        value={this.state.endDateSel}
                        onChange={this.onEndDateChange}>
                        <View className='picker'>
                            {this.state.endDateSel}
                        </View>
                    </Picker>
                    <Picker className='event-prop-value'
                        mode='time' 
                        value={this.state.endTimeSel}
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
                        start={this.state.minDeadlineDate}
                        value={this.state.deadlineDateSel}
                        onChange={this.onDeadlineDateChange}>
                        <View className='picker'>
                            {this.state.deadlineDateSel}
                        </View>
                    </Picker>
                    <Picker className='event-prop-value'
                        mode='time' 
                        start={this.state.minDeadlineTime}
                        value={this.state.deadlineTimeSel}
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
