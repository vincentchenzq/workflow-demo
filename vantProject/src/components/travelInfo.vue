<template>
  <div class="travelInfo">
    <van-cell-group title="房间号" class="travelInfo-title">
      <span>天然居</span> -
      <input v-model="queryCondition.buildingName" readonly class="floor" @click="building_list" />栋 -
      <input v-model="queryCondition.keyword" @input="handleInput" class='search' placeholder="请输入房间号查询"/>
      <ul class="room-list" >
        <li 
          v-for="(item,index) in roomList" 
          :key="index"
          @click="selectRoom(item.id,item.unit,item.room_number)"
        >{{item.unit}}栋{{item.room_number}}</li>
      </ul>
      <person-info 
        v-for="(item, index) in personList" 
        :userInfo="item" 
        :key="index" 
        :travelType="travelType"
        />
        <van-button v-if="isSelectRoom" @click="showAddUserModal = true" class="addBtn" size="mini" block icon="plus" plain type="info">添加该房间人员</van-button>
    </van-cell-group>
    <van-popup v-model="showModal" position="bottom" :style="{ height: '30%' }">
      <!-- <van-picker :columns="columns" @change="onChange" /> -->
      <!-- <van-picker
        title="请选择楼栋"
        :columns="columns"
        @change="onConfirm"
      /> -->
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="showModal = false"
        @confirm="onConfirm"
      />
    </van-popup>

    <van-dialog 
      v-model="showAddUserModal" 
      title="标题" 
      show-cancel-button
      @confirm="addUser"
      @cancel="showAddUserModal = false"
      >
      <van-field v-model="userName" label="请输入姓名" />
    </van-dialog>

  </div>
</template>

<script>
import { Toast } from 'vant';
import { building_list,room_list,room_people,add_person } from '../apis/index';
import debounce from 'lodash.debounce';
// import throttle from 'lodash.throttle';

import PersonInfo from './personInfo';
export default {
  props: {
    personList: {
      type: Array,
    },
    index: {
      type: Number,
    },
    travelType:{
      type:String,
      default:'travel'
    },
    defaultData: {
      type:Object | Array,
      default: () => {}
    }
  },
  data() {
    return {
      showModal: false,
      building:[],//楼宇列表
      columns: [],
      queryCondition: {
        building_id:'',
        buildingName:'',
        keyword:'',
      },
      roomList:[],
      isSelectRoom:false ,// 是否选了房间
      showAddUserModal: false, // 是否显示增加人员弹框
      userName:'', // 新增的人员姓名
      roomId:''
    };
  },
  methods: {
    handleInput(e) {
      this.search(e.target.value);
    },
    // 查询房间列表
    search(va) {
      if(this.queryCondition.building_id==""){
        Toast("请先选择楼栋");
        return;
      }
      room_list({
        token:this.$store.state.token,
        ...this.queryCondition
        }).then(response=>{
        this.roomList=response.data;
      })
    },
    // 选中房间
    selectRoom(id,unit,room_number) {
      this.roomList = [];
      this.isSelectRoom = true;
      this.roomId = id;
      this.queryCondition.keyword = `${unit}栋${room_number}`
      room_people({
        token:this.$store.state.token,
        room_id:id
      }).then(res => {
        const personList = res.data.map(item => {
          return {
            username:item.username,
            room_id:id,
            temperature:'',
            is_normal:1,
            checked:false
          }
        })
        this.$emit('update-user',{personList:this.personList,newUsers:personList,index:this.index})
      })
    },
    building_list(){
      this.showModal=true;
    },
    getBuildingList() {
      building_list({token:this.$store.state.token}).then(response=>{
        this.columns=response.data.map(item => {
          return {
            text: item.building_number,
            value:item.id
          }
        });
      })
    },
    onConfirm(value1) {
      console.log(value1);
      this.showModal=false;
      this.queryCondition.building_id = value1.value;
      this.queryCondition.buildingName = value1.text;
    },
    addUser() {
      add_person({
        token:this.$store.state.token,
        room_id:this.roomId,
        username:this.userName
      }).then(res => {
        const personList = JSON.parse(JSON.stringify(this.personList)).push({
          userName:this.userName
        })
        this.$emit('update-user',{
          personList:this.personList,
          newUsers:[...this.personList,{
            username:this.userName,
            room_id:this.roomId,
            temperature:'',
            is_normal:1,
            checked:false
          }],
          index:this.index
          })
        this.userName = '';
      })
    }
  },
  created() {
    this.getBuildingList();
  },
  mounted() {
    this.search = debounce(this.search, 300);
    
  },
  watch: {
    defaultData(newVal) {
      if(newVal.room_id){
        this.queryCondition.building_id = newVal.building_number;
        this.queryCondition.buildingName = this.columns.find(item => item.value== newVal.building_number).text;
        this.queryCondition.keyword = `${newVal.unit}栋${newVal.room_number}`
      }
    }
  },
  components: {
    PersonInfo,
  },
};
</script>

<style lang="less" scoped>
// .van-cell-group__title{
//     padding-bottom: 10px;
//   }
.travelInfo{
  padding:0 15px;
  .travelInfo-title{
    padding:10px 0;
  }
  .van-cell-group__title{
    padding:0 0 10px 0;
  }
  .floor {
    border: none;
    outline: none;
    box-shadow: none;
    border-bottom: 1px solid #eeeeee;
    width: 20%;
    text-align: center;
  }
  .search{
    border: none;
    outline: none;
    box-shadow: none;
    border-bottom: 1px solid #eeeeee;
    width:114px;
  }
  .room-list{
    position: absolute;
    z-index: 1;
    background-color: #fff;
    right: -10px;
    width: 200px;
    box-sizing: border-box;
    box-shadow: 0 8px 12px #ebedf0;
    li{
      font-size: 14px;
      padding:8px;
    }
  }
  .addBtn{ 
    margin-top:12px;
  } 
}

</style>