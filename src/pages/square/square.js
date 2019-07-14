import Taro, { Component } from '@tarojs/taro';
import {
  View,
  Text,
  Image,
  ScrollView,
  Swiper,
  SwiperItem,
  Button,
} from '@tarojs/components';
import './square.scss';

const labelText = [
  '全部',
  '学习',
  '运动',
  '游玩',
  '约饭',
  '桌游',
  '蹦迪',
  '聊天',
];
export default class Square extends Component {
  static externalClasses = ['square', 'title-text'];

  config = {
    navigationBarTitleText: '广场',
  };

  static options = {
    addGlobalClass: true,
  };

  state = {
    checkLabel: 0,
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  onScrollToUpper(e) {
    console.log(e.detail);
  }

  onScroll(e) {
    console.log(e.detail);
  }

  render() {
    const textViews = labelText.map((item, i) => {
      if (i === this.state.checkLabel) {
        return (
          <Text key={i} className="title-text-checked">
            {item}
          </Text>
        );
      }
      return (
        <Text key={i} className="title-text-uncheck">
          {item}
        </Text>
      );
    });

    return (
      <View className="square">
        <View className="float-view">
          <Button>发起</Button>
        </View>
        <Text className='title-text' onClick={ () => {
          Taro.navigateTo({
          url: '/pages/detail/detail'
        })
        } }>融资速递：WarDucks完成A轮融资</Text>
        <Swiper
          className="swipe"
          indicatorColor="#999"
          indicatorActiveColor="#333"
          vertical={false}
          circular
          indicatorDots
          autoplay
        >
          <SwiperItem>
            <Image
              className="banner-image"
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1562484118033&di=7e601ab5a3512820ca111a4db9f2c95f&imgtype=0&src=http%3A%2F%2Fpic68.nipic.com%2Ffile%2F20150601%2F8164280_104301508000_2.jpg"
            />
          </SwiperItem>
          <SwiperItem>
            <Image
              className="banner-image"
              src="http://pic23.nipic.com/20120830/9686992_180336646144_2.jpg"
            />
          </SwiperItem>
          <SwiperItem>
            <Image
              className="banner-image"
              src="http://www.dongao.com/upload/resources/image/2017/04/18/61906.jpg"
            />
          </SwiperItem>
        </Swiper>
        <ScrollView
          className="scrollTitle"
          scrollX
          scrollWithAnimation
          onScrollToUpper={this.onScrollToUpper}
          onScroll={this.onScroll}
        >
          {textViews}
        </ScrollView>
        <ScrollView className="scrollContent">
          <View className="item-view">
            <View className="item-view-left">
              <Text className="item-view-title">
                周六有没有人约篮球啊！10人体育馆！速来！
              </Text>
              <Text className="item-view-subTitle">
                软件 兰石磊发布于54分钟前
              </Text>
            </View>
            <View className="item-view-right">
              <Image
                className="item-view-image"
                src="http://www.dongao.com/upload/resources/image/2017/04/18/61906.jpg"
              />
            </View>
          </View>

          <View className="item-view">
            <View className="item-view-left">
              <Text className="item-view-title">
                周六有没有人约篮球啊！10人体育馆！速来！
              </Text>
              <Text className="item-view-subTitle">
                软件 兰石磊发布于54分钟前
              </Text>
            </View>
            <View className="item-view-right">
              <Image
                className="item-view-image"
                src="http://www.dongao.com/upload/resources/image/2017/04/18/61906.jpg"
              />
            </View>
          </View>

          <View className="item-view">
            <View className="item-view-left">
              <Text className="item-view-title">
                周六有没有人约篮球啊！10人体育馆！速来！
              </Text>
              <Text className="item-view-subTitle">
                软件 兰石磊发布于54分钟前
              </Text>
            </View>
            <View className="item-view-right">
              <Image
                className="item-view-image"
                src="http://www.dongao.com/upload/resources/image/2017/04/18/61906.jpg"
              />
            </View>
          </View>

          <View className="item-view">
            <View className="item-view-left">
              <Text className="item-view-title">
                周六有没有人约篮球啊！10人体育馆！速来！
              </Text>
              <Text className="item-view-subTitle">
                软件 兰石磊发布于54分钟前
              </Text>
            </View>
            <View className="item-view-right">
              <Image
                className="item-view-image"
                src="http://www.dongao.com/upload/resources/image/2017/04/18/61906.jpg"
              />
            </View>
          </View>

          <View className="item-view">
            <View className="item-view-left">
              <Text className="item-view-title">
                周六有没有人约篮球啊！10人体育馆！速来！
              </Text>
              <Text className="item-view-subTitle">
                软件 兰石磊发布于54分钟前
              </Text>
            </View>
            <View className="item-view-right">
              <Image
                className="item-view-image"
                src="http://www.dongao.com/upload/resources/image/2017/04/18/61906.jpg"
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
