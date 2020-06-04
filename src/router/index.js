import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// 导入刚才编写的组件
import AppIndex from '@/components/home/AppIndex'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Home from '@/components/Home'
import Daily from '@/components/daily/Daily'
import Regional from '@/components/regional/Regional'
import Monthly from '@/components/monthly/Monthly'
import Analyze from '@/components/analyze/Analyze'
import Market from '@/components/market/Market'
import map from '@/components/home/Map'


Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path:'/home',
      name:'Home',
      component:Home,
      //home页面并不需要被访问
      redirect:'/index',
      children:[
        {path:'/index',name:'AppIndex',component:AppIndex,
          meta:{
            requireAuth:true
          },
        
        },
        {path:'/daily',name:'Daily',component:Daily,
          meta:{
            requireAuth:true
          }
        },
        {path:'/regional',name:'Regional',component:Regional,
          meta:{
            requireAuth:true
          }
        },
        {path:'/monthly',name:'Monthly',component:Monthly,
          meta:{
            requireAuth:true
          }
        },
        {path:'/analyze',name:'Analyze',component:Analyze,
          meta:{
            requireAuth:true
          }
        },{path:'/market',name:'Market',component:Market,
          meta:{
            requireAuth:true
          }
        },{path:'/map',name:'ap',component:map,
        meta:{
          requireAuth:true
        }
      }]
    },
    {path: '/',name: 'HelloWorld',component: HelloWorld,
      meta:{
        requireAuth:true
      }
    },
    // 下面都是固定的写法
    {path: '/login',name: 'Login',component: Login},
    {path:'/register',name:'Register',component:Register}
    // {
    //   path: '/index',
    //   name: 'AppIndex',
    //   component: AppIndex,
    //   meta: {
    //     requireAuth: true
    //   }
    // }
  ]
})
