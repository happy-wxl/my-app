import { Get, Post } from "./request.js"
/**
 * 用户登陆
 * @param {*} params
 */
async function Login (params) {
  return await Post({
    url: "/user/login",
    data: params.data
  })
}
export {
  Login
}
