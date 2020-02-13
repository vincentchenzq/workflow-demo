<template>
  <div id="app">
    <keep-alive :include="includeList">
      <router-view />
    </keep-alive>

    <!-- <van-tabbar route>
      <van-tabbar-item replace to="/" icon="wap-home-o">
        首页
      </van-tabbar-item>
      <van-tabbar-item replace to="/about" icon="contact">
        我的
      </van-tabbar-item>
    </van-tabbar> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      includeList:['Travel','Enter']
    }
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  // text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
