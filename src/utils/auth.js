import Taro from '@tarojs/taro'

export function getUserInfo() {
    return new Promise((resolve, reject) => {
        Taro.getSetting().then((settings) => {
            if (settings.authSetting['scope.userInfo']) {
                // 用户已经授权，直接获取
                Taro.getUserInfo({
                    success: function(info) {
                        return resolve(info)
                    }
                })
            } else {
                // 没有授权过
                Taro.navigateTo({
                    url: '/pages/login/login'
                })
            }
        })
    })
}