// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import echarts from 'echarts'
import 'vue-easytable/libs/themes-base/index.css'
import {VTable,VPagination} from 'vue-easytable'
import AMap from 'vue-amap';
import china from 'echarts/map/json/china.json'
echarts.registerMap('china', china)

// 设置反向代理，前端请求默认发送到 http://localhost:8443/api
var axios = require('axios')
axios.defaults.baseURL = 'http://localhost:8443/api'
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

Vue.component(VTable.name,VTable)
Vue.component(VPagination.name,VPagination)

Vue.use(ElementUI)
Vue.use(echarts)
Vue.use(AMap)

/**
 * 首先判断访问的路径是否需要登录，如果需要，判断 store 里有没有存储 user 的信息，
 * 如果存在，则放行，否则跳转到登录页面，并存储访问的页面路径（以便在登录后跳转到访问页）
 */
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.state.user.username) {
      next()
    } else {
      next({
        path: 'login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  render:h=>h(App),
  router,
  store,
  components: { App },
  template: '<App/>'
})

AMap.initAMapApiLoader({
  key: '2ccd12fbfc43c91401095ff214895bfb',//刚刚开发者申请哪里的key
  plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType']
});
