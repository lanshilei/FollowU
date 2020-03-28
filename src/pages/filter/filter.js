import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtTag, AtSlider } from 'taro-ui'
import { authGetLocation } from '../../utils/auth'
import locationIcon from '../../images/location.jpg'
import editIcon from '../../images/edit.jpg'
import './filter.scss'

export default class filter extends Component {

  config = {
    navigationBarTitleText: '条件筛选'
  }

  constructor() {
    super(...arguments)
    this.state = {
      place: '选择地点',
      latitude: -1,
      longitude: -1,
      checkedTime: 0,
      timeSelector: ['不限', '上午', '下午', '晚上'], 
      checkedCost: 0,
      costSelector: ['不限', '付费', '免费', 'AA'], 
      checkedType: 0,
      typeSelector: ['不限', '社交', '户外', '摄影', '宠物', '健康', '黑科技', '室内游戏', 
                    '家庭亲子' , '运动健身', '艺术文艺', '时尚美妆'], 
      maxDistance: 100,
      distance: 100,
    }
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  changeLocation = e => {
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

  onTimeChange = (index) => {
    this.setState({
      checkedTime: index
    })
  }

  onCostChange = (index) => {
    this.setState({
      checkedCost: index
    })
  }

  onTypeChange = (index) => {
    this.setState({
      checkedType: index
    })
  }

  onDistanceChange = (e) => {
    this.setState({
      distance: e.value
    })
  }

  onSaveChange = () => {
    console.log("save")
  }

  render() {
    return (
      <View className='container'>
        <Text className='filter-title'>我的位置</Text>
        <View className='location-layout'>
          <View className='location-text'>
            <Image className='location-icon' src={locationIcon}></Image>
            <Text>{this.state.place}</Text>
          </View>
          <View className='change-location'>
            <Image className='location-icon' src={editIcon}></Image>
            <Text
              onClick={this.changeLocation.bind(this)}>修改</Text>
          </View>
        </View>

        <Text className='filter-title'>活动时间</Text>
        <View className='at-row at-row--wrap'>
          {this.state.timeSelector.map((item, i) => {
            if (i === this.state.checkedTime) {
              return (
                <View className='at-col at-col-3'>
                  <Text className='tag-selected' key={i}>{item}</Text>
                </View>
              );
            }
            return (
              <View className='at-col at-col-3'>
                <Text className='tag-unselected' key={i} onClick={this.onTimeChange.bind(this, i)}>{item}</Text>
              </View>
            );
          })}
        </View>

        <Text className='filter-title'>活动费用</Text>
        <View className='at-row at-row--wrap'>
          {this.state.costSelector.map((item, i) => {
            if (i === this.state.checkedCost) {
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

        <Text className='filter-title'>活动类型</Text>
        <View className='at-row at-row--wrap'>
          {this.state.typeSelector.map((item, i) => {
            if (i === this.state.checkedType) {
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

        <Text className='filter-title'>距离我</Text>
        <AtSlider className='distance-slider' 
          min={0} max={this.state.maxDistance} value={this.state.distance} blockSize={16}
          backgroundColor='#E9E9E9' activeColor='#83A046' onChange={this.onDistanceChange}/>
        <View className='distance-container'>
          <Text className='distance-text'>{this.state.distance != 100 ? this.state.distance + "Km" : "不限"}</Text>
        </View>

        <Text className='btn-save' onClick={this.onSaveChange.bind(this)}>保存设置</Text>
      </View>
    )
  }
}
