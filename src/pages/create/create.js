import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtInput, AtInputNumber, AtButton } from 'taro-ui'
import { post } from '../../http/api'
import { authSubscribeMessage, authGetLocation } from '../../utils/auth'
import { formatDate, formatTime, getTimeInMills, getCurrentTimeInMills } from '../../utils/util'
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
    let maxDeadline = new Date(this.computeDeadlineScope(oneHourLate.getTime()))
    let maxDate = formatDate(maxDeadline)
    let maxTime = formatTime(maxDeadline)
    this.state = {
      typeSelector: ['学习', '运动', '游玩', '休闲', '交友', '社团', '其他'], 
      scopeSelector: ['全部可见', '仅同校可见', '除同校外可见'], 
      maxDeadlineDate: maxDate,
      maxDeadlineTime: maxTime,
      typeSel: 0, 
      title: '',
      place: '',
      latitude: -1, 
      longitude: -1,
      scopeSel: 0,
      minPeople: 1, 
      maxPeople: 1,
      startDateSel: date,
      startTimeSel: time,
      endDateSel: date,
      endTimeSel: time,
      deadlineDateSel: maxDate,
      deadlineTimeSel: maxTime,
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
    var maxDeadline = new Date(this.computeDeadlineScope(getTimeInMills(e.detail.value, this.state.startTimeSel)))
    var maxDate = formatDate(maxDeadline)
    var maxTime = formatTime(maxDeadline)
    var currentDeadlineDate = this.state.deadlineDateSel
    var currentDeadlineTime = this.state.deadlineTimeSel
    if (getTimeInMills(currentDeadlineDate, currentDeadlineTime) < maxDeadline) {
      currentDeadlineDate = maxDate
      currentDeadlineTime = maxTime
    }
    this.setState({
      startDateSel: e.detail.value, 
      maxDeadlineDate: maxDate, 
      maxDeadlineTime: maxTime,
      deadlineDateSel: currentDeadlineDate, 
      deadlineTimeSel: currentDeadlineTime
    })
  }
  onStartTimeChange = e => {
    var maxDeadline = new Date(this.computeDeadlineScope(getTimeInMills(this.state.startDateSel, e.detail.value)))
    var maxDate = formatDate(maxDeadline)
    var maxTime = formatTime(maxDeadline)
    var currentDeadlineDate = this.state.deadlineDateSel
    var currentDeadlineTime = this.state.deadlineTimeSel
    if (getTimeInMills(currentDeadlineDate, currentDeadlineTime) > maxDeadline) {
      currentDeadlineDate = maxDate
      currentDeadlineTime = maxTime
    }
    this.setState({
      startTimeSel: e.detail.value, 
      maxDeadlineDate: maxDate,
      maxDeadlineTime: maxTime, 
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
  onChooseLocation = e => {
    authGetLocation().then(() => {
      this.openMap()
    }).catch(() => {
      Taro.showToast({
        title: '获取定位权限失败',
        icon: 'none'
      })
    })
  }
  openMap = () => {
    let params = {}
    if (this.state.latitude != -1 && this.state.longitude != -1) {
      params = {
        latitude: this.state.latitude, 
        longitude: this.state.longitude
      }
    }
    Taro.chooseLocation(params).then((result) => {
      this.setState({
        place: result.name, 
        latitude: result.latitude, 
        longitude: result.longitude
      })
    })
  }

  onSubmitForm = e => {
    if (!this.checkParams()) {
      return;
    }
    Taro.showModal({
      content: "确认提交？"
    }).then((res) => {
      if (res.confirm) {
        post("/event/save", true, {
          title: this.state.title,
          destination: this.state.place,
          latitude: this.state.latitude,
          longitude: this.state.longitude, 
          maxUserNum: this.state.maxPeople,
          minUserNum: this.state.minPeople,
          startTime: getTimeInMills(this.state.startDateSel, this.state.startTimeSel),
          endTime: getTimeInMills(this.state.endDateSel, this.state.endTimeSel),
          registrationDeadline: getTimeInMills(this.state.deadlineDateSel, this.state.deadlineTimeSel),
          remarks: this.state.remark,
          type: this.state.typeSel + 1,
          scope: this.state.scopeSel
        }).then((result) => {
          console.log("publish success: " + result)
          Taro.showToast({
            title: "发布成功！",
            icon: "none"
          })
          authSubscribeMessage().then(() => {
            Taro.navigateBack()
          })
        }).catch((error) => {
          console.error("publish error: " + error)
          Taro.showToast({
            title: "发布失败：" + error,
            icon: "none"
          })
        })
      }
    })
  }

  checkParams = () => {
    var pass = false
    var errorMsg = ''
    if (this.state.title == '') {
      errorMsg = '标题是必填项！'
    } else if (this.state.place == '') {
      errorMsg = '地点是必填项！'
    } else if (parseInt(this.state.maxPeople) < parseInt(this.state.minPeople)) {
      errorMsg = '最高人数不能低于最低人数！'
    } else if (getTimeInMills(this.state.startDateSel, this.state.startTimeSel) - getCurrentTimeInMills() < 60 * 60 * 1000) {
      errorMsg = '开始时间至少要比当前时间晚一个小时！'
    } else if (getTimeInMills(this.state.startDateSel, this.state.startTimeSel) - getTimeInMills(this.state.endDateSel, this.state.endTimeSel) > 0) {
      errorMsg = '结束时间不能早于开始时间！'
    } else if (getTimeInMills(this.state.deadlineDateSel, this.state.deadlineTimeSel) < getCurrentTimeInMills()) {
      errorMsg = '报名截止时间不能早于当前时间！'
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
                    <Text className='event-prop-key'>事件标签</Text>
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
                    <Text className='event-prop-key'>活动地点</Text>
                    <View onClick={this.onChooseLocation.bind(this)}>
                      <AtInput className='event-prop-value'
                        placeholder='请输入活动地点'
                        border={false}
                        editable={false}
                        value={this.state.place}
                        onChange={this.onPlaceChange.bind(this)}/>
                    </View>
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
                        min={1}
                        max={100}
                        step={1}
                        onChange={this.onMinChange.bind(this)}/>
                </View>
                <View className='prop-divide-line'/>
                <View className='event-prop-layout'>
                    <Text className='event-prop-key'>最高人数</Text>
                    <AtInputNumber className='event-prop-value'
                        value={this.state.maxPeople}
                        min={1}
                        max={100}
                        step={1}
                        onChange={this.onMaxChange.bind(this)}/>
                </View>
                <View className='prop-divide-line'/>
                <View className='event-prop-layout'>
                    <Text className='event-prop-key'>活动开始时间</Text>
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
                    <Text className='event-prop-key'>活动结束时间</Text>
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
                    <Text className='event-prop-key'>报名截止时间</Text>
                    <Picker className='event-prop-value'
                        mode='date' 
                        end={this.state.maxDeadlineDate}
                        value={this.state.deadlineDateSel}
                        onChange={this.onDeadlineDateChange}>
                        <View className='picker'>
                            {this.state.deadlineDateSel}
                        </View>
                    </Picker>
                    <Picker className='event-prop-value'
                        mode='time' 
                        end={this.state.maxDeadlineTime}
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
                        placeholder='请简短介绍这个事件来吸引大家参与吧'
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
