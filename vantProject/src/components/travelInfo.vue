<template>
  <div>
    <van-cell-group title="房间号">
      <span>天然居</span>-
      <input readonly class="floor" @click="building_list" />栋-
      <input @input="handleInput" />
      <person-info v-for="(item, index) in personList" :key="index" />
    </van-cell-group>
    <van-popup v-model="showModal" position="bottom" :style="{ height: '30%' }">
      <!-- <van-picker :columns="columns" @change="onChange" /> -->
      <van-picker
        show-toolbar
        title="请选择楼栋"
        :columns="columns"
        @cancel="onCancel"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import { Toast } from 'vant';
import { building_list,room_list } from '../apis/index';
import debounce from 'lodash.debounce';
// import throttle from 'lodash.throttle';

import PersonInfo from './personInfo';
export default {
  props: {
    personList: {
      type: Array,
      default: () => [1, 2, 3],
    },
  },
  data() {
    return {
      showModal: false,
      building:[],//楼宇列表
      columns: [],
    };
  },
  methods: {
    handleInput(e) {
      this.search(e.target.value);
    },
    search(va) {
      console.log(va);
      room_list({token:this.$store.state.token,building_id:1,keyword:102}).then(response=>{
        this.columns=response.data;
        console.log(response.data)
      })
    },
    building_list(){
      this.showModal=true;
      building_list({token:this.$store.state.token}).then(response=>{
        this.columns=response.data;
      })
    },
    onConfirm(value, index) {
      Toast(`当前值：${value}, 当前索引：${index}`);
      this.showModal=false;
    },
    onCancel() {
      this.showModal=false;
    }
  },
  mounted() {
    this.search = debounce(this.search, 300);
  },
  components: {
    PersonInfo,
  },
};
</script>

<style lang="less" scoped>
.floor {
  border: none;
  outline: none;
  box-shadow: none;
  border-bottom: 1px solid;
  width: 20%;
}
</style>