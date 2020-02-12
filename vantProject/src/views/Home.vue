<template>
  <div class="home">
    <van-nav-bar title="i小区" left-text>
      <!-- <van-icon name="search" slot="right" /> -->
    </van-nav-bar>
    <div class="home-data">
      <p class="home-data-name">天然居 2020.02.10</p>
      <ul>
        <li>
          <label style="color:#ff5148">10</label>
          <p>今日新登记</p>
        </li>
        <li>
          <label>10</label>
          <p>出门总计（次）</p>
        </li>
        <li>
          <label>10</label>
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
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
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
}
</style>
