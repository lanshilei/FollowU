import Taro, { Component } from '@tarojs/taro';
import PropTypes from 'prop-types';
import './index.scss'
import { View } from '@tarojs/components';
import { EventGroup } from '../eventGroup'

class EventList extends Component {
  static propTypes = {
    list: PropTypes.array,
  };
  static defaultProps = {
    list: [],
  };

  render() {
    const { list } = this.props;
    let group = []
    for (var i = 0; i < list.length; i += 4) {
      group.push(list.slice(i, i + 4));
    }
    return (
      <View>
        { group.length > 0 ? (
          <View>
            {group.map((item, index) => (
              <EventGroup 
                key={index}
                list={item}/>
            ))}
          </View>
        ) : (
          <View />
        )}
      </View>
    );
  }
}
