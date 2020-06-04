<template>
  <body id="paper">
  <el-form class="login-container" label-position="left"
           label-width="0px" v-loading="loading">
    <h3 class="login_title">用户注册</h3>
    <el-form-item>
      <el-input type="text" v-model="loginForm.username" minlength="8" maxlength="20" clearable show-word-limit
                auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="password" v-model="loginForm.password" minlength="8" maxlength="20"
                auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 40%;background: #505458;border: none" v-on:click="register">注册</el-button>
      <router-link to="login"><el-button type="primary" style="width: 40%;background: #505458;border: none">返回</el-button></router-link>
    </el-form-item>
  </el-form>
  </body>
</template>
<script>
  export default{
    data () {
      return {
        checked: true,
        loginForm: {
          username: '',
          password: ''
        },
        loading: false
      }
    },
    methods: {
      register () {
        var _this = this
        this.$axios
          .post('/register', {
            username: this.loginForm.username,
            password: this.loginForm.password
          })
          .then(resp => {
              if (resp.data.code === 200) {
                console.log("注册成功0");
                this.$alert('注册成功', '提示', {
                    confirmButtonText: '确定'
                })
                console.log("注册成功1");
                _this.$router.replace('/login')
            } else {
                this.$alert(resp.data.message, '提示', {
                    confirmButtonText: '确定'
                })
            }
          })
          .catch(failResponse => {})
      }
    }
  }
</script>
<style>
  #paper {
    background:url("../assets/one.jpg") no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  body{
    margin: -5px 0px;
  }
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 450px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
</style>

