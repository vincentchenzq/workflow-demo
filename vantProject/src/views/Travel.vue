// 出行登记
<template>
  <div class="travel">
    <van-nav-bar title="出行登记" left-text="返回" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <div class="card">
      <van-field v-model="queryCondition.car_number" label="车牌号" />
      <van-cell title="出行通道" @click="showModal = true" is-link arrow-direction="down" v-model="queryCondition.travelChannel" />
      <van-field v-model="queryCondition.travelTime" label="出行时间" />
    </div>
    <div class="travel-title">
      <p>出门人员信息</p>
      <van-button icon="plus" plain type="info">添加房间</van-button>
    </div>
    <div class="card">
      <travel-info v-for="(item,index) in userInfo" :key="index" />
    </div>
    <van-popup v-model="showModal" position="bottom">
      <van-picker :columns="$store.state.gates_list" @change="onChangeGate" />
    </van-popup>
    <van-button type="info" size="large">确认</van-button>
    <van-button type="primary" size="normal">普通按钮</van-button>
  </div>
</template>

<script>
import TravelInfo from '../components/travelInfo';

export default {
  name:'Travel',
  data() {
    return {
      queryCondition: {
        car_number: '', // 车牌号
        travelChannel: '', // 通道
        people:{},
        travelTime: format(new Date()),
      },
      userInfo: [1, 2, 3],
      showModal: false,
    };
  },
  methods: {
    onClickLeft() {
      // this.$router.go(-1);
      // 用下面的更好一点
      this.$router.back();
    },
    onChangeGate(val,value) {
      this.queryCondition.travelChannel = value;
      this.showModal= false;
    }
  },
  components: {
    TravelInfo,
  },
};

function format(date, fmt = 'yyyy-MM-dd hh:mm:ss') {
  var o = {
    'M+': date.getMonth() + 1, //月份
    'd+': date.getDate(), //日
    'h+': date.getHours(), //小时
    'm+': date.getMinutes(), //分
    's+': date.getSeconds(), //秒
    'q+': Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    );
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      );
    }
  }
  return fmt;
}
</script>
<style lang="less" scoped>
.travel {
  background-color: #f7f8fa;
  .card {
    margin: 12px 15px 0 15px;
    padding: 24px;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 8px 12px #ebedf0;
  }
  .travel-title {
    display: flex;
    justify-content: space-between;
    margin: 12px 15px;
    p {
      font-weight: bold;
    }
  }
}
</style>
