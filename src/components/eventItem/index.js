import Taro, { Component } from '@tarojs/taro';
import PropTypes from 'prop-types';
import { View } from '@tarojs/components';
import eventItem1 from '../../images/eventItem1.jpg'
import eventItem2 from '../../images/eventItem2.jpg'

import './index.scss'

class EventItem extends Component {
  static propTypes = {
    type: PropTypes.number, 
    data: PropTypes.map,
  };
  static defaultProps = {
    type: 0, 
    data: {},
  };

  gotoDetail = e => {
    Taro.navigateTo({
      url: `/pages/detail/detail`
    })
  }

  render() {
    const { type, data } = this.props;
    return (
      <View
        className={type == 0 ? 'event-item-size1' : 'event-item-size2'}
        onClick={this.gotoDetail}>
        <Image
          className={type == 0 ? 'item-view-image-size1' : 'item-view-image-size2'}
          src={type == 0 ? eventItem1 : eventItem2} />
        <Text className="item-view-title">
          {data.title}
        </Text>
        <Text className="item-view-time">
          {"活动时间：" + data.time}
        </Text>
        <Text className="item-view-place">
          {data.place}
        </Text>
      </View>
    )
  }
}
