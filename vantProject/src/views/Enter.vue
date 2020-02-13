// 出行登记
<template>
  <div class="travel">
    <van-nav-bar title="进门登记" left-text="返回" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <div class="card">
      <div class="card-search">
        <van-field v-model="queryCondition.car_number" label="车牌号" />
        <van-button type="info" @click="search">查询</van-button>
      </div>
      <van-cell
        title="进门通道"
        @click="showModal = true"
        is-link
        arrow-direction="down"
        v-model="queryCondition.travelChannel"
      />
      <van-field v-model="queryCondition.travelTime" label="进门时间" />
    </div>
    <div class="travel-title">
      <p>进门人员信息</p>
      <van-button icon="plus" plain type="info" @click="addRoom">添加房间</van-button>
    </div>
    <div class="card" v-for="(item,index) in userInfo" :key="index">
      <travel-info
        :personList.sync="item"
        :index="index"
        @update-user="addUser"
        :travelType="'enter'"
        :defaultData="extraData[index]"
      />
    </div>
    <van-popup v-model="showModal" position="bottom">
      <!-- <van-picker :columns="$store.state.gates_list" @change="onChangeGate" /> -->
      <van-picker
        show-toolbar
        :columns="$store.state.gates_list"
        @cancel="showModal = false"
        @confirm="onChangeGate"
      />
    </van-popup>
    <van-button @click="submit" type="info" size="large">确认</van-button>
  </div>
</template>

<script>
import Vue from 'vue';
import { Toast } from 'vant';
import TravelInfo from '../components/travelInfo';
import { in_record, search_car } from '../apis';

export default {
  name: 'Enter',
  data() {
    return {
      queryCondition: {
        car_number: '', // 车牌号
        travelChannel: this.$store.state.gates_list[0], // 通道
        people: {},
        travelTime: format(new Date()),
      },
      userInfo: [],
      showModal: false,
      extraData:[]
    };
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    onChangeGate(val) {
      this.queryCondition.travelChannel = val;
      this.showModal = false;
    },
    addUser({ personList, newUsers, index }) {
      Vue.set(this.userInfo, index, [...newUsers]);
    },
    submit() {
      debugger;
      const users = this.userInfo.reduce((prev, cur) => {
        const curChecked = cur.filter(item => item.checked);
        prev = prev.concat(curChecked);
        return prev;
      }, []);
      in_record({
        token: this.$store.state.token,
        car_number: this.queryCondition.car_number,
        gate_id: 1 || this.queryCondition.travelChannel,
        people: JSON.stringify(users),
      }).then(res => {
        Toast('提交成功');
        this.$router.back();
      });
    },
    // 添加房间
    addRoom() {
      this.userInfo.push([]);
    },
    //查询车牌
    search() {
      search_car({
        token: this.$store.state.token,
        car_number: this.queryCondition.car_number,
      }).then(res => {
        this.extraData = res.data;
        this.userInfo = res.data.map(item => {
          const people = item.people;
          people.forEach(it => {
            it = Object.assign(it,{
              room_id: item.room_id,
              temperature: '',
              is_normal: 1,
              checked: false,
            })
          });
          return people;
        });
      });
    },
  },
  mounted() {
    if (this.userInfo.length === 0) {
      this.addRoom();
    }
  },
  activated() {
    this.userInfo = [[]];
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
    padding: 24px 12px;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 8px 12px #ebedf0;
    .card-search {
      display: flex;
      button {
        width: 70px;
      }
    }
  }
  .travel-title {
    display: flex;
    justify-content: space-between;
    margin: 12px 15px;
    p {
      font-weight: bold;
    }
  }
  .van-button--large {
    width: 345px;
    margin: 50px 15px 100px;
  }
}
</style>
