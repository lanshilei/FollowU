import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input } from '@tarojs/components'
import { AtInput, AtInputNumber, AtButton } from 'taro-ui'
import { post, upload } from '../../utils/request'
import { authSubscribeMessage, authGetLocation } from '../../utils/auth'
import { formatDate, formatTime, getTimeInMills, getCurrentTimeInMills } from '../../utils/datetime'
import uploadIcon from '../../images/upload_image.jpg'
import './create.scss'

export default class Create extends Component {

  config = {
    navigationBarTitleText: '活动发起'
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
      eventImage: '',
      typeSelector: ['社交', '户外', '摄影', '宠物', '健康', '黑科技', '室内游戏',
        '家庭亲子', '运动健身', '艺术文艺', '时尚美妆'], 
      costSelector: ['免费', '付费', 'AA'], 
      typeSel: -1, 
      showTypeSelector: false, 
      costSel: -1, 
      showCostSelector: false, 
      title: '',
      startDateSel: date,
      startTimeSel: time,
      endDateSel: date,
      endTimeSel: time,
      deadlineDateSel: maxDate,
      deadlineTimeSel: maxTime,
      maxDeadlineDate: maxDate,
      maxDeadlineTime: maxTime,
      place: '',
      latitude: -1,
      longitude: -1,
      minPeople: 1, 
      maxPeople: 1,
      costValue: -1, 
      wxNum: '',
      remark: ''
    }
  }

  showTypeSelector = (e) => {
    this.setState({
      showTypeSelector: !this.state.showTypeSelector
    })
  }
  onTypeChange = (index) => {
    this.setState({
      typeSel: index, 
      showTypeSelector: false
    })
  }
  showCostSelector = (e) => {
    this.setState({
      showCostSelector: !this.state.showCostSelector
    })
  }
  onCostChange = (index) => {
    this.setState({
      costSel: index,
      showCostSelector: false
    })
  }
  onTitleChange = e => {
    this.setState({
      title: e.detail.value
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
  onPlaceChange = (value) => {
    this.setState({
      place: value
    })
  }
  onMinChange = (e) => {
    this.setState({
      minPeople: e.detail.value
    })
  }
  onMaxChange = (e) => {
    this.setState({
      maxPeople: e.detail.value
    })
  }
  onCostValueChange = (e) => {
    this.setState({
      costValue: e.detail.value
    })
  }
  onWXNumChange = (e) => {
    this.setState({
      wxNum: e.detail.value
    })
  }
  onRemarkChange = (e) => {
    this.setState({
      remark: e.detail.value
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

  onUploadImage = e => {
    let promise = new Promise((resolve, reject) => {
      Taro.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          var tempFilePaths = res.tempFilePaths
          upload('/event/uploadImg', tempFilePaths[0])
            .then((imgUrl) => {
              return resolve(imgUrl)
            })
        }
      })
    })
    promise.then((url) => {
      this.setState({
        eventImage: url
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
          imgUrl: this.state.eventImage, 
          title: this.state.title,
          destination: this.state.place,
          latitude: this.state.latitude,
          longitude: this.state.longitude, 
          maxUserNum: Number(this.state.maxPeople),
          minUserNum: Number(this.state.minPeople),
          startTime: getTimeInMills(this.state.startDateSel, this.state.startTimeSel),
          endTime: getTimeInMills(this.state.endDateSel, this.state.endTimeSel),
          registrationDeadline: getTimeInMills(this.state.deadlineDateSel, this.state.deadlineTimeSel),
          remarks: this.state.remark,
          eventType: Number(this.state.typeSel) + 1,
          feeType: Number(this.state.costSel) + 1, 
          fee: this.state.costValue, 
          weChatNumber: this.state.wxNum
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
    } else if (Number(this.state.costSel) === -1) {
      errorMsg = '请选择活动费用类型'
    } else if (Number(this.state.costSel) !== 0 && Number(this.state.cost) === -1) {
      errorMsg = '请输入活动费用金额'
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
        <View className='event-container'>
          <View className="event-img-layout">
            <Text className="event-img-key">为您的活动配一张图</Text>
            {
              this.state.eventImage === '' ?
                <Image className='event-image-value' src={uploadIcon} onClick={this.onUploadImage.bind(this)}/> :
                <Image className='event-image-value' src={this.state.eventImage} />
            }
          </View>
          {/* ----- 活动类型 ----- */}
          <View className='event-prop-layout'>
            <Text className='event-prop-key'>活动类型</Text>
            <View className='event-prop-value'
              onClick={this.showTypeSelector.bind(this)}>
              <Input className='event-value-input' 
                placeholder="选择活动类型"
                placeholderStyle='color:#979d94'
                disabled={true}
                value={this.state.typeSelector[this.state.typeSel]}
                onInput={this.onPlaceChange}>
              </Input>
            </View>
          </View>
          <View>
            {this.state.showTypeSelector 
              ? <View className='at-row at-row--wrap'>
                {this.state.typeSelector.map((item, i) => {
                  if (i === this.state.typeSel) {
                    return (
                      <View className='at-col at-col-3' key={i}>
                        <Text className='tag-selected'>{item}</Text>
                      </View>
                    );
                  }
                  return (
                    <View className='at-col at-col-3' key={i}>
                      <Text className='tag-unselected' onClick={this.onTypeChange.bind(this, i)}>{item}</Text>
                    </View>
                  );
                })}
              </View>
              : <View/>
            }
          </View>
          
          {/* ----- 活动标题 ----- */}
          <View className='event-prop-layout'>
            <Text className='event-prop-key'>活动标题</Text>
            <View className='event-prop-value'>
              <View className='title-input-layout'>
                <Input className='event-value-input' 
                  placeholder="请输入活动标题"
                  placeholderStyle='color:#979d94'
                  maxLength='20'
                  onInput={this.onTitleChange}>
                </Input>
                <Text className='title-limit'>{this.state.title.length + "/20"}</Text>
              </View>
            </View>
          </View>

          {/* ----- 活动时间 ----- */}
          <View className='event-prop-layout'>
            <Text className='event-prop-key'>活动开始时间</Text>
            <View className='event-prop-value'>
              <Picker className='date-value'
                mode='date'
                value={this.state.startDateSel}
                onChange={this.onStartDateChange}>
                <View className='picker'>
                  {this.state.startDateSel}
                </View>
              </Picker>
              <Picker className='time-value'
                mode='time'
                value={this.state.startTimeSel}
                onChange={this.onStartTimeChange}>
                <View className='picker'>
                  {this.state.startTimeSel}
                </View>
              </Picker>
            </View>
          </View>

          <View className='event-prop-layout'>
            <Text className='event-prop-key'>活动结束时间</Text>
            <View className='event-prop-value'>
              <Picker className='date-value'
                mode='date'
                value={this.state.endDateSel}
                onChange={this.onEndDateChange}>
                <View className='picker'>
                  {this.state.endDateSel}
                </View>
              </Picker>
              <Picker className='time-value'
                mode='time'
                value={this.state.endTimeSel}
                onChange={this.onEndTimeChange}>
                <View className='picker'>
                  {this.state.endTimeSel}
                </View>
              </Picker>
            </View>
          </View>

          <View className='event-prop-layout'>
            <Text className='event-prop-key'>报名截止时间</Text>
            <View className='event-prop-value'>
              <Picker className='date-value'
                mode='date'
                end={this.state.maxDeadlineDate}
                value={this.state.deadlineDateSel}
                onChange={this.onDeadlineDateChange}>
                <View className='picker'>
                  {this.state.deadlineDateSel}
                </View>
              </Picker>
              <Picker className='time-value'
                mode='time'
                end={this.state.maxDeadlineTime}
                value={this.state.deadlineTimeSel}
                onChange={this.onDeadlineTimeChange}>
                <View className='picker'>
                  {this.state.deadlineTimeSel}
                </View>
              </Picker>
            </View>
          </View>

          {/* ----- 活动地点 ----- */}
          <View className='event-prop-layout'>
            <Text className='event-prop-key'>活动地点</Text>
            <View className='event-prop-value'
              onClick={this.onChooseLocation.bind(this)}>
              <Input className='event-value-input' 
                placeholder="请选择活动地点"
                placeholderStyle='color:#979d94'
                disabled={true}
                value={this.state.place}
                onInput={this.onPlaceChange}>
              </Input>
            </View>
          </View>

          {/* ----- 参与人数 ----- */}
          <View className='event-prop-layout'>
            <Text className='event-prop-key'>最低参与人数</Text>
            <View className='event-prop-value'>
              <Input className='event-value-input' 
                type="number"
                placeholder="活动最低人数限制"
                placeholderStyle='color:#979d94'
                onInput={this.onMinChange}>
              </Input>
            </View>
          </View>
          <View className='event-prop-layout'>
            <Text className='event-prop-key'>最高参与人数</Text>
            <View className='event-prop-value'>
              <Input className='event-value-input' 
                type="number"
                placeholder="活动最高人数限制"
                placeholderStyle='color:#979d94'
                onInput={this.onMaxChange}>
              </Input>
            </View>
          </View>

          {/* ----- 费用类型 ----- */}
          <View className='event-prop-layout'>
            <Text className='event-prop-key'>费用类型</Text>
            <View className='event-prop-value'
              onClick={this.showCostSelector.bind(this)}>
              <Input className='event-value-input' 
                placeholder="活动费用类型"
                placeholderStyle='color:#979d94'
                disabled={true}
                value={this.state.costSelector[this.state.costSel]}
                onInput={this.onCostChange}>
              </Input>
            </View>
          </View>
          <View>
            {this.state.showCostSelector 
              ? <View className='at-row at-row--wrap'>
                {this.state.costSelector.map((item, i) => {
                  if (i === this.state.costSel) {
                    return (
                      <View className='at-col at-col-3' key={i}>
                        <Text className='tag-selected'>{item}</Text>
                      </View>
                    );
                  }
                  return (
                    <View className='at-col at-col-3' key={i}>
                      <Text className='tag-unselected' onClick={this.onCostChange.bind(this, i)}>{item}</Text>
                    </View>
                  );
                })}
              </View>
              : <View/>
            }
          </View>

          {/* ----- 费用金额 ----- */}
          <View>
            {(this.state.costSel === -1 || this.state .costSel === 0)
              ? <View/> 
              : <View className='event-prop-layout'>
                  <Text className='event-prop-key'>费用金额</Text>
                  <View className='event-prop-value'>
                    <Input className='event-value-input' 
                      type="number"
                      placeholder="活动费用金额"
                      placeholderStyle='color:#979d94'
                      onInput={this.onCostValueChange}>
                    </Input>
                  </View>
                </View>
            }
          </View>

          {/* ----- 微信号 ----- */}
          <View className='event-prop-layout'>
            <Text className='event-prop-key'>微信号</Text>
            <View className='event-prop-value'>
              <Input className='tevent-value-input' 
                type="number"
                placeholder="请填写你的微信号"
                placeholderStyle='color:#979d94'
                onInput={this.onWXNumChange}>
              </Input>
            </View>
          </View>

          {/* ----- 留言 ----- */}
          <View className='event-prop-layout'>
            <Text className='event-prop-key'>留言</Text>
            <View className='event-prop-value'>
              <Input className='event-value-input' 
                type="number"
                placeholder="说点什么吧~"
                placeholderStyle='color:#979d94'
                maxLength='50'
                onInput={this.onRemarkChange}>
              </Input>
            </View>
          </View>

          <Text className='btn-submit' onClick={this.onSubmitForm.bind(this)}>提交</Text>
        </View>
    )
  }
}
