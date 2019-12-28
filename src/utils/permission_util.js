const TEMPLATE_IDS = ['0zxDmA9u0TTJqy8EpIFlJoW4bC9q-nt3CA6liiXqxA0']

export function requestSubscribeMessage() {
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
