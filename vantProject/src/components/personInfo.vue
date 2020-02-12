<template>
  <div class="person-info">
    <van-checkbox
      class="van-cell"
      shape="square"
      icon-size="14px"
      v-model="checked"
    >
      <van-icon class="user" size="14" name="contact" :color="getIconColor" />
      <span class="user-name">{{ userName }}</span>
    </van-checkbox>
    <div class="van-hairline--bottom"></div>
    <div class="van-cell" v-if="checked">
      <van-checkbox
        shape="square"
        slot="label"
        icon-size="14px"
        v-model="tempError"
        >是否体温异常</van-checkbox
      >
      <div slot="input">
        <input class="person-input" />
        ℃
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userName: {
      type: String,
      default: "王小二"
    }
  },
  data() {
    return {
      checked: false,
      tempError: false
    };
  },
  computed: {
    getIconColor() {
      return this.checked ? "#1989fa" : "";
    }
  }
};
</script>

<style lang="less" scoped>
.person-info {
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
    border-bottom: 1px solid;
  }
}
</style>
