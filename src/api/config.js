console.log(process.env)
let baseURL = process.env.NODE_ENV === "production" ? "http://admin.yqh168.com/v1/sys" : "http://testadmin.yqh168.com/v1/sys"
export default {
  baseURL:baseURL,
  headers: {
    "Content-Type": "application/json; charset=UTF-8"
  },
  timeout: 5000
}
