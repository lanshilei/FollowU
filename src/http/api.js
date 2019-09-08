import Taro from '@tarojs/taro'
import { base } from './config'
import { getGlobalData, setGlobalData, KEY_TOKEN } from '../utils/global_data'

const get = (url, needLogin, data = '') => {
    let option = { url, data, needLogin }
    return request(option)
}

const post = (url, needLogin, data) => {
    let params = { url, data, needLogin }
    return request(params, 'POST')
}

const request = (params, method = 'GET') => {
    let { url, data, needLogin } = params
    let token = getGlobalData(KEY_TOKEN)
    let contentType = 'application/x-www-form-urlencoded'
    let header = {}
    if (needLogin) {
        header = { 'content-type': contentType, 'authorization': token }
    } else {
        header = { 'content-type': contentType }
    }
    
    return Taro.request({
        url: base + url,
        data: data,
        method: method,
        header: header
    }).then((res) => {
        const { statusCode, data } = res
        if (statusCode === 200) {
            console.log("request success: " + statusCode + " " + JSON.stringify(data))
            if (data.code === '0') {
                return data.result
            } else {
                //TODO 处理服务器内部错误码
                throw new Error(data.code)
            }
        } else {
            console.error("request error, errorCode: " + res.statusCode)
            throw new Error(res.statusCode)
        }
    })
}

const login = () => {
    //login成功后用微信返回的code换取token
    wx.login({
        success: function (res) {
            if (res.code) {
                get("/login/getToken", false, {
                    code: res.code
                }).then((result) => {
                    setGlobalData(KEY_TOKEN, result)
                }).catch((error) => {
                    console.error('login failed: ' + error)
                })
            } else {
                console.error(res.errMsg)
            }
        }
    })
}

export { get, post, login }