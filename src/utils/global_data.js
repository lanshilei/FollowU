/**
 * 这里放一些全局变量
 */
const globalData = {}
const KEY_TOKEN = 'global_key_token'

export function setGlobalData(key, val) {
    globalData[key] = val
}

export function getGlobalData(key) {
    return globalData[key]
}

export { KEY_TOKEN }