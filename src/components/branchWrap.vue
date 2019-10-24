<template>
  <div class="branch-wrap">
    <div class="branch-box-wrap">
      <!-- <AddNodeBtn></AddNodeBtn> -->
    </div>
  </div>
</template>

<script>
import branchBox from './branchBox'
import AddNodeBtn from './addNodeBtn';
export default {
  components: {
    AddNodeBtn
  }
}
</script>

<style lang="less" scoped>
.branch-wrap {
  display: inline-flex;
  width: 100%;
}
.branch-box-wrap {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  min-height: 270px;
  width: 100%;
  flex-shrink: 0;
}
</style>