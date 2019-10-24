<template>
  <div class="node-wrap">
    <Node :nodeType="nodeType"></Node>
    <AddNodeBtn></AddNodeBtn>
  </div>
</template>

<script>
import Node from './node';
import AddNodeBtn from './addNodeBtn';

export default {
  props: {
    nodeType: {
      type: String,
      default: 'startNode'
    }
  },
  components: {
    AddNodeBtn,
    Node
  }
}
</script>

<style lang="less" scoped>
.node-wrap {
  display: inline-flex;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  padding: 0 50px;
  position: relative;
}
</style>