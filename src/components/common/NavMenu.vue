<template>
    <!-- 第一，在 <el-menu> 标签中我们开启了 router 模式，启用该模式会在激活导航时以index作为path进行路由跳转
         第二，我们通过 v-for 指令，把 navList 数组渲染为一组 <el-menu-item> 元素，也即导航栏的内容。
             当然我们也可以分开写，这种用法只是显得 six 一些（当需要动态更改列表内容时就很有用了）
    -->
    <el-menu
      :default-active="'/index'"
      router     
      mode="horizontal"
      background-color="white"
      text-color="#222"
      active-text-color="red"
      
      style="min-width: 1300px;top:5px">
      <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
        {{ item.navItem }}
      </el-menu-item>
      <i class="el-icon-switch-button" v-on:click="logout" style="float:right;font-size: 40px;color: #222;padding: 10px"></i>
      <a href="#nowhere" style="color: #222;float: right;padding: 20px;">更多功能</a>
      <i class="el-icon-menu" style="float:right;font-size: 45px;color: #222;padding-top: 8px"></i>
      <span style="position: absolute;padding-top: 10px;right: 30%;font-size: 25px;font-weight: bold">燃料实时管理与智能分析系统</span>
    </el-menu>
</template>

<script>
  export default {
    name: 'NavMenu',
    data () {
      return {
        navList: [
          {name: '/index', navItem: '首页'},
          {name: '/daily', navItem: '日控指标'},
          {name: '/monthly', navItem: '月控指标'},
          {name: '/analyze', navItem: '数据分析'},
          {name: '/regional', navItem: '区域对标'},
          {name: '/market', navItem: '市场信息'}
        ]
      }
    },
    methods:{
      // 登出方法
      logout () {
        var _this = this;
        this.$axios.get('/logout').then(resp => {
          if (resp.data.code === 200) {
            // 前后端状态保持一致
            _this.$store.commit('logout')
            _this.$router.replace('/login')
          }
        })
      }

    }
  }
</script>

<style scoped>
  .a{
    text-decoration: none;
  }

  .span {
    pointer-events: none;
  }
  .el-icon-switch-button {
    cursor: pointer;
    outline:0;
  }

</style>

