<template>
  <div class="hello">
    <van-nav-bar title="i小区" left-text="">
      <!-- <van-icon name="search" slot="right" /> -->
    </van-nav-bar>
    <div class='home-data'>
      <p>天然居  2020.02.10</p>
        <ul>
          <li>
            <label>10</label>
            <p>今日新登记</p>
          </li>
          <li>
            <label>10</label>
            <p>出行总计（次）</p>
          </li>
          <li>
            <label>10</label>
            <p>进入总计（次）</p>
          </li>
        </ul>
    </div>

    <ul class='home-ul'>
      <li @click="travel">
        <van-image
          round
          width="50px"
          height="50px"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
        <span>出行登记</span>
      </li>
      <li @click="enter">
        <van-image
          round
          width="50px"
          height="50px"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
        <span>进入登记</span>
      </li>
    </ul>

    <!-- <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-router" target="_blank" rel="noopener">router</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-vuex" target="_blank" rel="noopener">vuex</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul> -->
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods:{
    travel:function(){
      this.$router.push({
          path: `/Travel`,
        })
    },
    enter:function(){
      this.$router.push({
          path: `/Enter`,
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
body{
  margin: 20px;
}
.home-data{
  width: 95%;
  margin:0 auto;
  background-color: #1989fa;
  padding:20px;
  box-sizing: border-box;
  p{
    margin: 0;
    text-align: left;
  }
  ul{
    display: flex;
    justify-content: space-between;
  }
}
.home-ul{
  width: 95%;
  margin:0 auto;
  li{
    border:1px solid #1989fa;
    padding:20px;
    // border-radius: 10px;
    margin: 20px 0;
    display: flex;
    align-items: center;
    image{
      width: 50px;
      height:50px;
    }
    span{
      margin-left: 30px;
      color:#1989fa;
      font-weight: bold;
    }
  }
}
</style>
