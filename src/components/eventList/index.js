import Taro, { Component } from '@tarojs/taro';
import PropTypes from 'prop-types';
import './index.scss'
import { View } from '@tarojs/components';

class EventList extends Component {
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
      <View>
        { list.length > 0 ? (
          <View className='event-list-container'>
            {list.map((item, index) => (
              <View 
                className='event-item'
                key={index}
                data-id={item.id}
                onClick={this.gotoDetail}>
                <View className='event-content'>
                  <View className="item-view-left">
                    <Text className="item-view-title">
                      {item.title}
                    </Text>
                    <Text className="item-view-subTitle">
                      {item.description}
                    </Text>
                  </View>
                  <View className="item-view-right">
                    <Image
                      className="item-view-image"
                      src="http://www.dongao.com/upload/resources/image/2017/04/18/61906.jpg" />
                  </View>
                </View>
                <View className='event-divider' />
              </View>
            ))}
          </View>
        ) : (
          <View />
        )}
      </View>
    );
  }
}
