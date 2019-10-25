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
  name: 'NodeWrap',
  props: {
    nodeType: {
      type: String,
      default: 'start'
    }
  },
  components: {
    AddNodeBtn,
    Node
  }
}
</script>