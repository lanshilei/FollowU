import Taro from '@tarojs/taro'
import { BASE_URL } from './global_data'
import { authLogin } from './auth'

const get = (url, needLogin, data = '') => {
    if (needLogin) {
        return requestWithToken(url, data, "GET")
    } else {
        return requestWithoutToken(url, data, "GET")
    }
}

const post = (url, needLogin, data) => {
    if (needLogin) {
        return requestWithToken(url, data, "POST")
    } else {
        return requestWithoutToken(url, data, "POST")
    }
}

const requestWithToken = (url, data, method) => {
    let params = { url, data }
    return new Promise((resolve, reject) => {
        authLogin().then(token => {
            let header = { 'content-type': 'application/x-www-form-urlencoded', 'authorization': token }
            request(params, header, method)
                .then(res => {
                    return resolve(res)
                }).catch(error => {
                    return reject(error)
                })
        }).catch(() => {
            Taro.showToast({
                title: '登录失败，请重试！', 
                icon: 'none'
            })
        })
    })
}

const requestWithoutToken = (url, data, method) => {
    let params = { url, data }
    let header = { 'content-type': "application/x-www-form-urlencoded" }
    return request(params, header, method)
}

const request = (params, header, method) => {
    let { url, data } = params
    return Taro.request({
        url: BASE_URL + url, 
        data: data, 
        method: method, 
        header, header
    }).then(res => {
        const { statusCode, data } = res
        if (statusCode === 200) {
            console.log("request success: " + statusCode + " " + JSON.stringify(data))
            if (data.code === '0') {
                return data.result
            } else {
                //TODO 处理服务器内部错误码 100->授权过期
                throw new Error(data.code)
            }
        } else {
            throw new Error(res.statusCode)
        }
    })
}

export { get, post }