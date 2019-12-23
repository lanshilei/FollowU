import Taro, { Component } from '@tarojs/taro';
import { View, Text, ScrollView, Swiper, SwiperItem } from '@tarojs/components';
import { AtFab } from 'taro-ui';
import { EventList } from '../../components/eventList'
import { get } from '../../http/api';
import './square.scss';

export default class Square extends Component {

  config = {
    navigationBarTitleText: '广场',
  };

  constructor() {
    super(...arguments)
    this.state = {
      checkLabel: 0, 
      typeSelector: ['全部', '休闲', '运动', '游玩', '学习', '交友', '社团', '其他'], 
      eventList: []
    }
  }
  
  componentWillMount() {}

  componentDidMount() {
    get("/event/query", false, {
      pageNum: 1,
      pageSize: 10
    }).then((result) => {
      console.log("getList success: " + JSON.stringify(result))
      this.setState({
        eventList: result.list
      })
    }).catch((error) => {
      console.log("getList error: " + error)
    })
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  onScrollToUpper(e) {
    console.log(e.detail);
  }

  onScroll(e) {
    console.log(e.detail);
  }

  onCreateClick = e => {
    Taro.navigateTo({
      url: '/pages/create/create',
    });
  }

  render() {
    const textViews = this.state.typeSelector.map((item, i) => {
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
            onClick={this.onCreateClick.bind()}>
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

        <ScrollView
          className="scrollTitle"
          scrollX
          scrollWithAnimation
          onScrollToUpper={this.onScrollToUpper}
          onScroll={this.onScroll} >
          {textViews}
        </ScrollView>
        
        <EventList list={this.state.eventList}/>
      </View>
    );
  }
}
