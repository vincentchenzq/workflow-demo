<template>
  <div id="app">
    <Zoom v-bind:scale.sync="scale" />
    <!-- 组件容器组件 -->
    <div class="container">
      <!-- 用于放大缩小 -->
      <div class="box-scale" :style="boxscaleStyle">
        <RenderNode2 :list="dataJson" />
        <!-- <RenderNode /> -->
        <!-- 发起节点 -->
        <!-- <NodeWrap nodeType="start"></NodeWrap> -->
        <!-- 审批节点 -->
        <!-- <NodeWrap nodeType="approver"></NodeWrap> -->
        <!-- 抄送节点 -->
        <!-- <NodeWrap nodeType="notifier"></NodeWrap> -->
        <!-- 条件分支 -->
        <!-- <BranchWrap :conditionNodes="conditionNodes"></BranchWrap> -->
      </div>
    </div>
  </div>
</template>

<script>
import Zoom from './components/zoom';
import NodeWrap from './components/nodeWrap';
import BranchWrap from './components/branchWrap';
import dataJson from './data.json';
import RenderNode from './renderNode'
import RenderNode2 from './renderNode2'
import './design.css'
export default {
  name: 'app',
  data() {
    return {
      scale: 100,
      dataJson,
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
  created() {


  },
  components: {
    Zoom,
    NodeWrap,
    BranchWrap,
    RenderNode,
    RenderNode2
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
  background-color: #f5f5f7;
}
</style>
