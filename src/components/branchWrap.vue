<template>
  <div class="branch-wrap">
    <div class="branch-box-wrap">
      <BranchBox :conditionNodes="conditionNodes"></BranchBox>
      <AddNodeBtn></AddNodeBtn>
    </div>
  </div>
</template>

<script>
import BranchBox from './branchBox'
import AddNodeBtn from './addNodeBtn';
export default {
  props: {
    conditionNodes: {
      type: Array,
      default: () => []
    }
  },
  components: {
    AddNodeBtn,
    BranchBox
  }
}
</script>