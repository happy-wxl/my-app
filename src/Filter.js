import Vue from "vue"
import {
  isArray,
  formattingNumber,
  run,
  isNumber,
  isTrue,
  FormatDate,
  formatTime,
  Typeof
} from "./utils/utils.js"
/**
 * 保留两位小数格式化金额
 */
Vue.filter("FormattedAmount", (value, num = 2) => {
  if (value === "*") {
    return value
  } else {
    return Number(value).toFixed(num)
  }
})
/**
 * 自动补全位数
 */
Vue.filter("completions", (value, len = 6) => {
  let str = "0"
  if (!isTrue) str = "*"
  value = "" + value
  if (value === "*") str = "*"
  return value.padStart(len, str)
})
/**
 * 给数字格式化为千分分隔
 */
Vue.filter("formattingNumber", value => {
  if (!value) return ""
  return formattingNumber(value + "")
})
/**
 * 测试 无用
 */
Vue.filter("run", function (value) {
  if (value === "") return ""
  return run(value, 3000)
})
/**
 * 翻倍
 */
Vue.filter("calculation", function (value, cal) {
  if (value === "") return ""
  if (value === "*") return value
  value = value - 0
  return value * cal
})
/**
 * 截取字符串
 */
Vue.filter("substring", function (value, start = 0, end = 0) {
  if (!value) return ""
  value = "" + value
  return value.substring(start, end) || ""
})
/**
 * 格式化时间
 */
Vue.filter("FormatDate", function (value, type) {
  if (!value) return ""
  return FormatDate(value, type)
})
/**
 * 格式化倒计时时间
 */
Vue.filter("formatTime", function (value) {
  if (!value) return "00:00:00"
  return formatTime(value)
})
/**
 * 分隔数字整数小数
 */
Vue.filter("splitnumber", function (value, index) {
  if (!value) return "*"
  value = Number(value).toFixed(2)
  value = value + ""
  return value.split(".")[index]
})
/**
 * 隐藏字符
 */
Vue.filter("hideChar", function (value, char = "****", start = 3, end = 4) {
  // let hideChar = value.substr(start, end)
  return value.substr(0, start) + char + value.substr(7)
  // return value.replace(hideChar, "****")
})
