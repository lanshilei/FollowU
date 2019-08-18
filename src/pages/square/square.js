import Taro, { Component } from '@tarojs/taro';
import {
  View,
  Text,
  Image,
  ScrollView,
  Swiper,
  SwiperItem,
  Picker,
} from '@tarojs/components';
import { AtFab } from 'taro-ui';
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
    selectArea: ['大连理工', '大连地区', '北京地区'],
    areaChecked: '大连理工',
    selectAttention: ['全部', '只看关注', '只看男生', '只看女生'],
    attentionChecked: '全部',
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

  onAreaChange = e => {
    this.setState({
      areaChecked: this.state.selectArea[e.detail.value],
    });
  };

  onAttentionChange = e => {
    this.setState({
      attentionChecked: this.state.selectAttention[e.detail.value],
    });
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
          <AtFab
            onClick={() => {
              Taro.navigateTo({
                url: '/pages/create/create',
              });
            }}
          >
            <Text className="at-fab__icon at-icon at-icon-add" />
          </AtFab>
        </View>
        <Text
          className="title-text"
          onClick={() => {
            Taro.navigateTo({
              url: '/pages/detail/detail',
            });
          }}
        >
          融资速递：WarDucks完成A轮融资
        </Text>
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

        <View className="picker-view">
          <Picker
            mode="selector"
            range={this.state.selectArea}
            onChange={this.onAreaChange}
          >
            <View className="square-picker">
              地区：{this.state.areaChecked}
            </View>
          </Picker>

          <Picker
            mode="selector"
            range={this.state.selectAttention}
            onChange={this.onAttentionChange}
          >
            <View className="square-picker">
              关注：{this.state.attentionChecked}
            </View>
          </Picker>
        </View>

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
