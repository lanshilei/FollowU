/**
 * 这里放一些全局变量
 */
const globalData = {}
export const BASE_URL = "http://49.233.15.125:33000/followU/"
export const KEY_TOKEN = 'global_key_token'
export const TEMPLATE_IDS = ['0zxDmA9u0TTJqy8EpIFlJoW4bC9q-nt3CA6liiXqxA0']

export function setGlobalData(key, val) {
    globalData[key] = val
}

export function getGlobalDgata(key) {
    return globalData[key]
}
