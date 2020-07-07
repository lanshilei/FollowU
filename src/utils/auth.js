import Taro from '@tarojs/taro'
import { TEMPLATE_IDS, KEY_TOKEN, KEY_USERID } from './global_data'
import { get } from './request'

export function authLogin() {
    return new Promise((resolve, reject) => {
        checkToken().then(res => {
            return resolve(res)
        }).catch(() => {
            // 登录状态过期，重新login成功后用微信返回的code换取token
            Taro.login().then((res) => {
                if (res.code) {
                    // 这块needLogin必须是false，不然死循环
                    get("/login/getToken", false, {
                        code: res.code
                    }).then((result) => {
                        Taro.setStorage({ key: KEY_TOKEN, data: result.token })
                        Taro.setStorage({ key: KEY_USERID, data: result.userId })
                        return resolve(result.token)
                    }).catch((error) => {
                        console.error('login failed: ' + error)
                        return reject()
                    })
                } else {
                    console.error(res.errMsg)
                    return reject()
                }
            })
        })
    })
}

function checkToken() {
    return new Promise((resolve, reject) => {
        Taro.getStorage({ key: KEY_TOKEN })
            .then(res => {
                if (res.data == undefined || res.data == '') {
                    return reject()
                } else {
                    Taro.checkSession().then(() => {
                        return resolve(res.data)
                    }).catch(() => {
                        return reject()
                    })
                }
            }).catch(() => {
                return reject()
            })
    })
}

export function authGetUserInfo() {
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

export function authGetLocation() {
    return new Promise((resolve, reject) => {
        Taro.getSetting().then((settings) => {
            if (settings.authSetting['scope.userLocation'] == undefined) {
                // 还未请求过授权，询问授权
                Taro.authorize({
                    scope: 'scope.userLocation'
                }).then(() => {
                    return resolve()
                }).catch(() => {
                    return reject()
                })
            } else if (settings.authSetting['scope.userLocation'] == true) {
                // 已经授权
                return resolve()
            } else if (settings.authSetting['scope.userLocation'] == false) {
                // 已经拒绝授权，引导进入设置页
                Taro.showModal({
                    title: '提示',
                    content: '无法获取定位权限，请前往小程序设置界面授权定位服务'
                }).then(call => {
                    if (call.confirm) {
                        Taro.openSetting().then(res => {
                            if (res.authSetting['scope.userLocation']) {
                                return resolve()
                            } else {
                                return reject()
                            }
                        })
                    }
                })
            }
        })
    })
}

export function authSubscribeMessage() {
    return new Promise((resolve, reject) => {
        const version = wx.getSystemInfoSync().SDKVersion
        if (compareVersion(version, '2.8.2') >= 0) {
            wx.requestSubscribeMessage({
                tmplIds: TEMPLATE_IDS,
                complete() {
                    return resolve()
                }
            })
        } else {
            return resolve()
        }
    })
}

function compareVersion(v1, v2) {
    v1 = v1.split('.')
    v2 = v2.split('.')
    const len = Math.max(v1.length, v2.length)

    while (v1.length < len) {
        v1.push('0')
    }
    while (v2.length < len) {
        v2.push('0')
    }

    for (let i = 0; i < len; i++) {
        const num1 = parseInt(v1[i])
        const num2 = parseInt(v2[i])

        if (num1 > num2) {
            return 1
        } else if (num1 < num2) {
            return -1
        }
    }

    return 0
}