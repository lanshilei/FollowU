import Taro, { Component } from '@tarojs/taro';
import { View, Text, ScrollView, Swiper, SwiperItem } from '@tarojs/components';
import { AtFab } from 'taro-ui';
import { EventList } from '../../components/eventList'
import { get } from '../../utils/request';
import './square.scss';

export default class Square extends Component {

  config = {
    navigationBarTitleText: '广场',
  };

  constructor() {
    super(...arguments)
    this.state = {
      bannerImages: ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1562484118033&di=7e601ab5a3512820ca111a4db9f2c95f&imgtype=0&src=http%3A%2F%2Fpic68.nipic.com%2Ffile%2F20150601%2F8164280_104301508000_2.jpg',
        'http://www.dongao.com/upload/resources/image/2017/04/18/61906.jpg',
        'http://www.dongao.com/upload/resources/image/2017/04/18/61906.jpg'], 
      checkedScope: 0, 
      scopeSelector: ['同城', '同行业', '同公司', '我的关注'], 
      eventList: []
    }
  }
  
  componentWillMount() {}

  componentDidMount() {
    this.loadData()
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

  onScopeChange = (index) => {
    this.setState({
      checkedScope: index
    }, () => {
        this.loadData()
    })
  }

  onCreateClick = e => {
    Taro.navigateTo({
      url: '/pages/create/create',
    });
  }

  onFilterClick = e => {
    Taro.navigateTo({
      url: '/pages/filter/filter'
    })
  }

  loadData() {
    get("/event/query", false, {
      pageNum: 1,
      pageSize: 10,
      status: 0, 
      type: this.state.checkedScope
    }).then((result) => {
      this.setState({
        eventList: result.list
      })
    }).catch((error) => {
      console.log("getList error: " + error)
    })
  }

  testData() {
    this.setState({
      eventList: [
        {
          title: '周末单车活动，小伙伴们约起来啊，骑行绕五环一周，快快报名吧！',
          place: '北京海淀区',
          time: '2020.02.19'
        },
        {
          title: '周六有没有人约篮球，今年冬天最后一次活动，快快报名参加吧！',
          place: '北京大学体育场',
          time: '2020.02.19'
        },
        {
          title: '周六有没有人约篮球，今年冬天最后一次活动，快快报名参加吧！',
          place: '北京大学体育场',
          time: '2020.02.19'
        },
        {
          title: '周末单车活动，小伙伴们约起来啊，骑行绕五环一周，快快报名吧！',
          place: '北京海淀区',
          time: '2020.02.19'
        },
        {
          title: '周末单车活动，小伙伴们约起来啊，骑行绕五环一周，快快报名吧！',
          place: '北京海淀区',
          time: '2020.02.19'
        },
        {
          title: '周六有没有人约篮球，今年冬天最后一次活动，快快报名参加吧！',
          place: '北京大学体育场',
          time: '2020.02.19'
        },
        {
          title: '周六有没有人约篮球，今年冬天最后一次活动，快快报名参加吧！',
          place: '北京大学体育场',
          time: '2020.02.19'
        },
      ]
    })
  }

  render() {
    const textViews = this.state.scopeSelector.map((item, i) => {
      if (i === this.state.checkedScope) {
        return (
          <Text key={i} className="scope-text-checked">
            {item}
          </Text>
        );
      }
      return (
        <Text key={i} className="scope-text-uncheck" onClick={this.onScopeChange.bind(this, i)}>
          {item}
        </Text>
      );
    });

    return (
      <View className="square-container">
        <View className="float-view">
          <AtFab
            onClick={this.onCreateClick.bind()}>
            <Text className="at-fab__icon at-icon at-icon-add" />
          </AtFab>
        </View>

        <Swiper
          className="swipe"
          indicatorColor="#999"
          indicatorActiveColor="#333"
          circular
          indicatorDots
          autoplay>
          {this.state.bannerImages.map((item, i) => {
            return (
              <SwiperItem key={i}>
                <View className='banner-image-container'>
                  <Image
                    src={item}
                  />
                </View>
              </SwiperItem>
            )
          })}
        </Swiper>

        <View className='filter-layout'>
          <View className='scope-layout'>
            {textViews}
          </View>
          <Text className='filter-btn'
            onClick={this.onFilterClick.bind(this)}>筛选</Text>
        </View>
        
        <EventList list={this.state.eventList}/>
      </View>
    );
  }
}
