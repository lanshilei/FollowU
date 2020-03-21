import Taro, { Component } from '@tarojs/taro';
import PropTypes from 'prop-types';
import './index.scss'
import { View } from '@tarojs/components';
import { EventItem } from '../../components/eventItem'

class EventGroup extends Component {
  static propTypes = {
    list: PropTypes.array,
  };
  static defaultProps = {
    list: [],
  };

  gotoDetail = e => {
    // navigate to detail page
    console.log("click detail")
  }

  render() {
    const { list, loading } = this.props;
    return (
      <View className='group-container'>
        <View className='item-layout'>
          <EventItem data={list[0]} type={1} />
          {
            list[2] != undefined ? <EventItem data={list[2]} type={0} /> : null
          }
        </View>
        <View className='item-layout'>
          {
            list[1] != undefined ? <EventItem data={list[1]} type={0} /> : null
          }
          {
            list[3] != undefined ? <EventItem data={list[3]} type={1} /> : null
          }
        </View>
      </View>
    );
  }
}
