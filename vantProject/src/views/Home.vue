<template>
  <div class="home">
    <van-nav-bar title="i小区" left-text>
      <!-- <van-icon name="search" slot="right" /> -->
    </van-nav-bar>
    <div class="home-data">
      <p class="home-data-name">{{$store.state.village_name}}  {{all_data.today}}</p>
      <ul>
        <li>
          <label style="color:#ff5148">{{all_data.today_new}}</label>
          <p>今日新登记</p>
        </li>
        <li>
          <label>{{all_data.out_sum}}</label>
          <p>出门总计（次）</p>
        </li>
        <li>
          <label>{{all_data.in_sum}}</label>
          <p>进门总计（次）</p>
        </li>
      </ul>
    </div>

    <ul class="home-ul">
      <li @click="travel" style="background-color:#4c88ff">
        <!-- <van-image width="20px" height="20px" src="../assets/images/travel.png" /> -->
        <img src="../assets/images/travel.png" alt />
        <span>出门登记</span>
      </li>
      <li @click="enter" style="background-color:#ff716a">
        <!-- <van-image width="20px" height="20px" src="../assets/images/enter.png" /> -->
        <img src="../assets/images/enter.png" alt />
        <span>进门登记</span>
      </li>
    </ul>

    <van-button type="primary" color="#ff716a" size="large" class="quit" @click="quit">退出登陆</van-button>
  </div>
</template>

<script>
import { Toast } from 'vant';
import { sum_footfall } from '../apis/index';
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  data(){
    return {
      all_data:{}
    }
  },
  created(){
    sum_footfall({token:this.$store.state.token}).then(response=>{
      console.log(response);
      this.all_data=response.data;
    })
  },
  methods: {
    travel: function() {
      this.$router.push({
        path: `/Travel`,
      });
    },
    enter: function() {
      this.$router.push({
        path: `/Enter`,
      });
    },
    quit:function(){
      this.$router.push({
        path:`/Login`
      })
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.home {
  background-color: #f8f7f9;
  height: 100vh;
  .home-data {
    margin: 15px 15px 0;
    background-color: #ffffff;
    border-radius: 5px;
    padding: 20px;
    box-sizing: border-box;
    .home-data-name {
      margin: 0;
      color: #333333;
      font-size: 16px;
      border-left: 3px solid #4c88ff;
      padding-left: 12px;
      font-weight: bold;
      text-align: left;
    }
    ul {
      display: flex;
      justify-content: space-between;
      margin-top: 25px;
      li {
        text-align: center;
        label {
          font-family: JCuYuan;
          font-size: 18px;
          color: #282828;
          display: block;
          margin-bottom: 12px;
        }
        p {
          font-size: 12px;
          font-weight: bold;
          color: #282828;
          margin-top: 12px;
          margin: 0;
        }
      }
    }
  }
  .home-ul {
    margin: 0 15px;
    li {
      padding: 20px;
      margin: 20px 0;
      display: flex;
      border-radius: 5px;
      align-items: center;
      img {
        display: inline-block;
        width: 20px;
        height: 20px;
      }
      span {
        margin-left: 21px;
        color: #ffffff;
        font-size: 16px;
        font-weight: bold;
      }
    }
  }
  .quit{
    width: 345px;
    position: fixed;
    bottom:100px;
    font-size: 16px;
    font-weight: bold;
    border-radius: 5px;
    margin-left: 15px;
  }
}
</style>
