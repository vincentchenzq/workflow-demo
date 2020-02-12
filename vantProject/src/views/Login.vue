
<template>
  <div class="login">
    <!-- <van-nav-bar title="进入登记" left-text="返回" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <h1>进入登记</h1>-->
    <p class="login-title">欢迎使用i小区</p>
    <input placeholder="请输入账号" type="text" v-model="phone"/>
    <input placeholder="请输入密码" type="password"  v-model="password"/>
    <van-button type="info" block @click="login">登录</van-button>
  </div>
</template>>
<script>
import { Toast } from 'vant';
import { login } from '../apis/index';
export default {
  data(){
      return{
          phone:'',
          password:''
      }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    login(){
        login({
            phone:this.phone,
            password:this.password
        }).then(response=>{
            this.$router.push({
                path: "/"
              });
        }
        )
    }
  },
};
</script>>
<style lang="less" scoped>
.login {
  margin: 0 15px;
  .login-title {
    font-size: 30px;
    margin: 65px 0 35px;
  }
  input {
    display: flex;
    flex: 1;
    border: none;
    padding-bottom: 20px;
    margin-bottom: 45px;
    width: 100%;
    border-bottom: 1px solid #c1c1c1;
  }
  button {
    border-radius: 5px;
  }
}
</style>