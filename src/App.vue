<template>
  <div id="app">
    <Zoom v-bind:scale.sync="scale" />
    <!-- 组件容器组件 -->
    <div class="container">
      <!-- 用于放大缩小 -->
      <div class="box-scale" :style="boxscaleStyle">
        <!-- <RenderNode2 :list="dataJson" /> -->
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
import './design.css';
import Activity from './Activity';
import Rule from './Rule';
import ENodeType from './ENodeType';
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
    console.log(`template data is -----------`)
    const workflowTemplate = JSON.parse(JSON.stringify(dataJson.ReturnData.Data.WorkflowTemplate));
    console.log(workflowTemplate);
    const { Activities, Rules } = workflowTemplate;
    // 找到开始节点
    const startNode = Activities.find(item => item.ActivityType === 0);
    const startCode = startNode.ActivityCode; // 后面的流程没有开始节点，直接就是发起节点
    const startActivity = Rules.find(item => item.PreActivityCode === startCode).PostActivityCode; // 发起节点的Code
    const endActivity = Activities.find(item => item.ActivityType === ENodeType.End).ActivityCode; // 结束节点的Code
    let ids = []; // 用于存放id的数组
    // 取出Activeties 以及Rules
    // 过滤一些没用的节点
    let activities = Activities.filter(activity => {
      return [ENodeType.Begin, ENodeType.Start, ENodeType.Approve, ENodeType.End, ENodeType.Notifier].includes(activity.ActivityType)
    })
    // TODO: 太多没用的数据 先删除一些方便调试
    activities = activities.map((activity) => {
      ids.push(activity.Id);
      return new Activity(activity);
    })
    // 过滤一些没用的rules
    let rules = Rules.filter(rule => {
      return activities.some(item => item.ActivityCode === rule.PreActivityCode);
    })
    // TODO: 太多没用的数据 先删除一些方便调试
    rules = rules.map((rule) => {
      ids.push(rule.Id);
      return new Rule(rule)
    })
    const activeMap = {};
    let typeMap = {
      3: 'start',
      4: 'approver',
      25: 'notifier'
    }
    for (let i = 0; i < activities.length; i++) {
      activities[i].type = typeMap[activities[i].ActivityType]
      activities[i].children = [];
      activeMap[activities[i].ActivityCode] = activities[i];
    }
    const ruleMap = {}
    for (let i = 0; i < rules.length; i++) {
      const { PreActivityCode, PostActivityCode } = rules[i];
      rules[i].children = [];
      if (!ruleMap[PreActivityCode]) {
        ruleMap[PreActivityCode] = [];
      }
      ruleMap[PreActivityCode].push(rules[i])
    }
    // for (let i = 0; i < rules.length; i++) {
    //   const { PreActivityCode, PostActivityCode } = rules[i];
    //   // 说明是分支条件
    //   if (ruleMap[PreActivityCode].length >= 2) {
    //     rules[i].type = 'route';
    //     // let index = ruleMap[PostActivityCode].indexOf(rules[i]);
    //     rules[i].children.push(activeMap[PostActivityCode]);
    //     activeMap[PreActivityCode].children.push(rules[i])
    //   }
    //   // 表示 为正常节点
    //   if (ruleMap[PreActivityCode].length === 1) {
    //     activeMap[PreActivityCode].children.push(activeMap[PostActivityCode]);
    //   }
    // }

    console.log(`maxId is------------  ${Math.max(...ids)}`)
    console.log("SET_FLOWDATA is ----------");
    console.log(JSON.parse(JSON.stringify(activeMap[startCode])));
    console.log(`activeMap is ---------`)
    console.log(activeMap);
    console.log(`ruleMap is -------------`);
    console.log(ruleMap)


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
