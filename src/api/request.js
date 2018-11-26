import Config from "./config.js"
import axios from "axios"
// require("es6-promise").polyfill();
axios.defaults.baseURL = Config.baseURL

// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

let that = {
  self: null,
  loginInvalid: false
}
const ajax = function (params) {
  if (!params) {
    console.log()
    return Promise.reject(new TypeError("paramsNull"))
  }
  if (that.loginInvalid && params.url !== "/user/login") {
    let self = that.self
    self.$message({ type: "error", message: "登陆失效，请重新登陆" })
    self.$router.push({ name: "login" })
    return Promise.reject(new Error("loginInvalid"))
  }

  let p = new Promise((resolve, reject) => {
    let user = JSON.parse(sessionStorage.getItem("user")) || {}
    let accessToken = ""
    if (user.hasOwnProperty("accessToken")) {
      accessToken = user.accessToken
    }
    let contentType = ""
    if (params.contentType === "") {
      contentType = "application/json; charset=UTF-8"
    }
    if (params.contentType === "json") {
      contentType = "application/json; charset=UTF-8"
    }
    let options = {
      method: params.method || "get",
      url: params.url,
      headers: {
        accessToken: accessToken,
        "Content-Type": contentType
      },
      timeout: ""
    }
    let data = params.data || ""
    options.data = data
    if (options.method === "get") {
      let query = ""
      let ary = []
      Object.keys(options.data).forEach(item => {
        ary.push(item + "=" + options.data[item])
      })
      query += ary.join("&")
      options.data = {}
      if (query) {
        options.url += "?" + query
      }
    }
    axios(options)
      .then(res => {
        let self = that.self
        if (res.data.code === 10001) {
          that.loginInvalid = true
          self.$message({ type: "error", message: "登陆失效，请重新登陆" })
          self.$router.push({ name: "login" })
          Promise.reject(new Error("loginInvalid"))
        } else {
          resolve(res)
        }
      })
      .catch(err => reject(err))
  })
  return p
}
const Get = async function (params) {
  return await ajax({
    method: "get",
    url: params.url,
    data: params.data,
    contentType: params.contentType || ""
  })
}
const Post = async function (params) {
  return await ajax({
    method: "post",
    url: params.url,
    data: params.data,
    contentType: params.contentType || ""
  })
}
export { ajax, Get, Post, that }
