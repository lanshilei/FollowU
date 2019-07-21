import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtInput, AtInputNumber, AtButton } from 'taro-ui'
import './create.scss'

export default class Create extends Component {

  config = {
    navigationBarTitleText: '发起事件'
  }

  constructor () {
    super(...arguments)
    this.state = {
      minPeople: 1, 
      maxPeople: 1,
      startDateSel: '2019-07-21',
      endDateSel: '2019-07-21'
    }
  }

  handleMinChange (value) {
    this.setState({
        minPeople: value
    })
  }
  handleMaxChange (value) {
    this.setState({
        maxPeople: value
    })
  }
  onStartDateChange = e => {
    this.setState({
        startDateSel: e.detail.value
    })
  }
  onEndDateChange = e => {
    this.setState({
        endDateSel: e.detail.value
    })
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
                        placeholder='不超过15个字符'/>
                </View>
                <View className='prop-divide-line'/>
                <View className='event-prop-layout'>
                    <Text className='event-prop-key'>地点</Text>
                    <AtInput className='event-prop-value'
                        border={false}
                        placeholder='请输入活动地点'/>
                </View>
                <View className='prop-divide-line'/>
                <View className='event-prop-layout'>
                    <Text className='event-prop-key'>最低人数</Text>
                    <AtInputNumber className='event-prop-value'
                        value={this.state.minValue}
                        min={0}
                        max={100}
                        step={1}
                        onChange={this.handleMinChange.bind(this)}/>
                </View>
                <View className='prop-divide-line'/>
                <View className='event-prop-layout'>
                    <Text className='event-prop-key'>最高人数</Text>
                    <AtInputNumber className='event-prop-value'
                        value={this.state.maxValue}
                        min={0}
                        max={100}
                        step={1}
                        onChange={this.handleMaxChange.bind(this)}/>
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
                        placeholder='说点什么吧...'/>
                </View>
                <View className='prop-divide-line'/>

                <AtButton className='btn_submit'
                    type='primary'
                >提交</AtButton>
            </View>
        </View>
    )
  }
}
