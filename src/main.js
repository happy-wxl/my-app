import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import "./Filter.js"
import axios from "axios"
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import "./assets/css/reset.css"
import Antd from "ant-design-vue"
import "ant-design-vue/dist/antd.css"

Vue.use(ElementUI)
Vue.use(Antd)

Vue.prototype.$axios = axios
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  store.state.token = sessionStorage.getItem("token")// 获取本地存储的token
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (store.state.token) { // 通过vuex state获取当前的token是否存
      next()
    } else {
      next({
        path: "/login",
        query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
