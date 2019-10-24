<template>
  <div id="app">
    <Zoom v-bind:scale.sync="scale" />
    <!-- 组件容器组件 -->
    <div class="container">
      <!-- 用于放大缩小 -->
      <div class="box-scale" :style="boxscaleStyle">
        <!-- 发起节点 -->
        <NodeWrap nodeType="startNode"></NodeWrap>
        <!-- 审批节点 -->
        <NodeWrap nodeType="approveNode"></NodeWrap>
        <!-- 抄送节点 -->
        <NodeWrap nodeType="sendNode"></NodeWrap>
        <!-- 条件分支 -->
        <BranchWrap></BranchWrap>
      </div>
    </div>
  </div>
</template>

<script>
import Zoom from './components/zoom';
import NodeWrap from './components/nodeWrap'
import BranchWrap from './components/branchWrap'
export default {
  name: 'app',
  data() {
    return {
      scale: 100
    }
  },
  methods: {
  },
  computed: {
    // 缩放的样式
    boxscaleStyle() {
      return {
        transform: "scale(" + this.scale / 100 + ")",
        transformOrigin: "50% 0 0"
      }
    }
  },
  components: {
    Zoom,
    NodeWrap,
    BranchWrap,
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
