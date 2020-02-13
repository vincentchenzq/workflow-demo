<template>
  <div class="person-info">
    <van-checkbox class="van-cell" shape="square" icon-size="14px" v-model="userInfo.checked">
      <van-icon class="user" size="14" name="contact" :color="getIconColor" />
      <span class="user-name">{{ userInfo.username }}</span>
    </van-checkbox>
    <div class="van-hairline--bottom"></div>

    <div v-if="!isTravel && userInfo.checked" class="pre-time">
        <span>上次出门时间</span>
        <span>{{userInfo.out_time || '无'}}</span>
      </div>
    <div class="van-cell1" v-if="userInfo.checked">
      <van-checkbox
        shape="square"
        slot="label"
        icon-size="14px"
        v-model="tempError"
        class="isTemError"
      >是否体温异常</van-checkbox>
      <div slot="input">
        <input class="person-input" v-model="userInfo.temperature" />
        ℃
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userInfo: {
      type: Object,
      default: () => {},
    },
    travelType: {
      type: String,
    },
  },
  data() {
    return {};
  },
  methods: {
    changeHandle(e) {
      debugger
    }
  },
  computed: {
    getIconColor() {
      return this.checked ? '#1989fa' : '';
    },
    tempError: {
      get() {
        return this.userInfo && this.userInfo.is_normal !== 1;
      },
      set(val) {
        this.userInfo.is_normal = val ? 2 : 1;
      },
    },
    // 是否出门
    isTravel() {
      return this.travelType === 'travel';
    },
  },
};
</script>

<style lang="less" scoped>
.person-info {
  // border-bottom: 1px solid;
  .user {
    vertical-align: sub;
  }
  .user-name {
    padding-left: 6px;
  }
  .person-input {
    border: none;
    outline: none;
    box-shadow: none;
    margin-left: 12px;
  }
  .van-cell1 {
    display: flex;
    padding: 10px 0 10px 25px;
    input {
      width: 50px;
      text-align: center;
      border-bottom: 1px solid #eeeeee;
    }
  }
  .isTemError {
    width: 130px;
  }
  .pre-time{
    
  }
}
</style>
