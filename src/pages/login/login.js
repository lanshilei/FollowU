import Taro, { Component } from '@tarojs/taro'
import { AtAvatar, AtButton } from 'taro-ui'
import './login.scss'

export default class Login extends Component {

    config = {
        navigationBarTitleText: '授权登录'
    }

    componentWillMount() { }

    componentDidMount() { }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }

    onGetUserInfo = e => {
        if (e.detail.userInfo) {
            const pages = getCurrentPages()
            const prevPage = pages[pages.length - 2]
            prevPage.setData({
                userInfo: e.detail.userInfo
            })
        }
        Taro.navigateBack()
    }

    render() {
        return (
            <View className='login'>
                <View className='tip-layout'>
                    <AtAvatar className='avatar'
                        circle='true'
                        size='large'
                        image='https://jdc.jd.com/img/200' />
                    <Text className='text-title'>申请获得以下权限：</Text>
                    <Text className='text-subtitle'>获得你的公开信息(昵称，头像等)</Text>
                </View>
                <AtButton className='btn-login'
                    type='primary'
                    openType='getUserInfo'
                    onGetUserInfo={this.onGetUserInfo.bind(this)}
                >确认授权</AtButton>
            </View>
        )
    }
}
