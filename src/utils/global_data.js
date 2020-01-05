/**
 * 这里放一些全局变量
 */
const globalData = {}
const KEY_TOKEN = 'global_key_token'
const TEMPLATE_IDS = ['0zxDmA9u0TTJqy8EpIFlJoW4bC9q-nt3CA6liiXqxA0']

export function setGlobalData(key, val) {
    globalData[key] = val
}

export function getGlobalData(key) {
    return globalData[key]
}

export { KEY_TOKEN }