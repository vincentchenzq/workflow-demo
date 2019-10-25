<template>
  <div class="node-wrap-box" :class="{'start-node':nodeType ==='start'}">
    <div>
      <div class="title" :style="nodeConfig.background">
        <span class>{{nodeConfig.title}}</span>
      </div>
      <div class="content">
        <div class="text">{{nodeConfig.text}}</div>
        <!-- <i class="anticon anticon-right arrow"></i> -->
        <a-icon type="right" class="arrow" />
      </div>
    </div>
  </div>
</template>

<script>
import BranchWrap from './branchWrap';
import NodeWrap from './nodeWrap';
const NODE_CONFIG = {
  start: {
    background: 'background:rgb(87, 106, 149)',
    title: '发起人',
    text: '所有人'
  },
  approver: {
    background: 'background:rgb(255, 148, 62)',
    title: '审批人',
    text: '发起人自选'
  },
  notifier: {
    background: 'background:rgb(50, 150, 250)',
    title: '抄送人',
    text: '发起人自选'
  },
}
export default {
  props: {
    nodeType: {
      type: String,
      default: 'start'
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  methods: {
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
  computed: {
    nodeConfig() {
      console.log(this.nodeType)
      return NODE_CONFIG[this.nodeType];
    }
  },
  components: {
    BranchWrap,
    NodeWrap
  }
}
</script>