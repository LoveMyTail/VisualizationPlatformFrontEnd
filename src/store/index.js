import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
        /**
         * 这里我们还用到了 localStorage，即本地存储，在项目打开的时候会判断本地存储中是否有
         *  user 这个对象存在，如果存在就取出来并获得 username 的值，否则则把 username 设置
         * 为空。这样我们只要不清除缓存，登录的状态就会一直保存
         */
      username: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).username
    }
  },
  mutations: {
    login (state, user) {
      state.user = user
      window.localStorage.setItem('user', JSON.stringify(user))
    },
    logout (state) {
      // 注意不能用 null 清除，否则将无法判断 user 里具体的内容
      console.log("=======================")
      state.username = ''
      window.localStorage.removeItem('username')
      state.adminMenus = []
    }
  }
})
