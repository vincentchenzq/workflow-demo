<template>
  <div class="branch-box">
    <span class="add-branch">添加条件</span>
    <!-- <a-button icon="plus" shape="circle" type="primary" size="small" class="add-branch"></a-button> -->
    <template v-for="(item,index) in conditionNodes">
      <div class="col-box">
        <div class="top-left-cover-line" v-if="index===0"></div>
        <div class="bottom-left-cover-line" v-if="index===0"></div>
        <div class="condition-node">
          <div class="condition-node-box">
            <div class="auto-judge">
              <div class="title-wrapper">
                <span class="editable-title">{{item.name}}</span>
                <span class="priority-title">优先级1</span>
                <i class="anticon anticon-close close"></i>
              </div>
              <div class="content">
                <div>发起人属于：测试部</div>
              </div>
            </div>
            <AddNodeBtn></AddNodeBtn>
          </div>
        </div>
        <BranchWrap :conditionNodes="item.childNode.conditionNodes" v-if="isRoute(item)"></BranchWrap>

        <NodeWrap :nodeType="item.childNode.type" v-if="isNode(item)"></NodeWrap>
        <div class="top-right-cover-line" v-if="index === conditionNodes.length-1"></div>
        <div class="bottom-right-cover-line" v-if="index === conditionNodes.length-1"></div>
      </div>
    </template>
  </div>
</template>

<script>
import AddNodeBtn from './addNodeBtn';
import BranchWrap from './branchWrap';
import NodeWrap from './nodeWrap';
export default {
  props: {
    conditionNodes: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    isRight(index) {
      return index > (this.conditionNodes.length / 2)
    },
    hasChild(item) {
      return !!item.childNode
    },
    isNode(item) {
      return this.hasChild(item) && item.childNode.type !== 'route'
    },
    isRoute(item) {
      return this.hasChild(item) && item.childNode.type === 'route'
    }
  },
  components: {
    AddNodeBtn,
    BranchWrap,
    NodeWrap
  }
}
</script>