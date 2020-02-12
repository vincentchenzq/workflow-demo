
<template>
  <div class="enter">
    <van-nav-bar title="进入登记" left-text="返回" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <h1>进入登记</h1>
  </div>
</template>>
<script>
import { Toast } from 'vant';
export default {
    methods:{
      onClickLeft() {
        this.$router.go(-1);
      },
    }
}
</script>>
<style lang="less" scoped>

</style>