export function formatDate(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(
    value => formatLeadingZeroNumber(value, 2)
  ).join("-")
}

export function formatTime(date) {
  const hour = date.getHours()
  const minute = date.getMinutes()

  return [hour, minute].map(
    value => formatLeadingZeroNumber(value, 2)
  ).join(":")
}

export function formatDateTime(date, withMs = false) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  const ms = date.getMilliseconds()

  let ret = [year, month, day].map(value => formatLeadingZeroNumber(value, 2)).join('-') +
    ' ' + [hour, minute, second].map(value => formatLeadingZeroNumber(value, 2)).join(':')
  if (withMs) {
    ret += '.' + formatLeadingZeroNumber(ms, 3)
  }
  return ret
}

export function getTimeInMills(date, time) {
  let params = date + ' ' + time + ':00'
  let dateTime = new Date(params)
  return dateTime.getTime()
}

function formatLeadingZeroNumber(n, digitNum = 2) {
  n = n.toString()
  const needNum = Math.max(digitNum - n.length, 0)
  return new Array(needNum).fill(0).join('') + n
}