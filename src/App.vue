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
import RenderNode from './renderNode';
import RenderNode2 from './renderNode2';
import './design.css';
import Activity from './Activity';
import Rule from './Rule';
import RuleContainer from './RuleContainer';
import ENodeType from './ENodeType';
export default {
  name: 'app',
  data() {
    return {
      scale: 100,
      dataJson,
    };
  },
  methods: {},
  computed: {
    // 缩放的样式
    boxscaleStyle() {
      return {
        transform: 'scale(' + this.scale / 100 + ')',
        transformOrigin: '50% 0 0',
      };
    },
  },
  created() {
    console.log(`template data is -----------`);
    const workflowTemplate = JSON.parse(
      JSON.stringify(dataJson.ReturnData.Data.WorkflowTemplate)
    );
    console.log(workflowTemplate);
    const { Activities, Rules } = workflowTemplate;
    // 找到开始节点
    const startNode = Activities.find(item => item.ActivityType === 0);
    const startCode = startNode.ActivityCode; // 后面的流程没有开始节点，直接就是发起节点
    const startActivity = Rules.find(item => item.PreActivityCode === startCode)
      .PostActivityCode; // 发起节点的Code
    const endActivity = Activities.find(
      item => item.ActivityType === ENodeType.End
    ).ActivityCode; // 结束节点的Code
    let ids = []; // 用于存放id的数组
    // 取出Activeties 以及Rules
    // 过滤一些没用的节点
    let activities = Activities.filter(activity => {
      return [
        ENodeType.Begin,
        ENodeType.Start,
        ENodeType.Approve,
        ENodeType.End,
        ENodeType.Notifier,
      ].includes(activity.ActivityType);
    });
    // TODO: 太多没用的数据 先删除一些方便调试
    activities = activities.map(activity => {
      ids.push(activity.Id);
      return new Activity(activity);
    });
    // 开始
    const start = activities.filter(
      item => item.ActivityType === ENodeType.Begin
    )[0];
    // 过滤一些没用的rules
    let rules = Rules.filter(rule => {
      return activities.some(
        item => item.ActivityCode === rule.PreActivityCode
      );
    });
    // TODO: 太多没用的数据 先删除一些方便调试
    rules = rules.map(rule => {
      ids.push(rule.Id);
      return new Rule(rule);
    });
    const activeMap = {};
    let typeMap = {
      3: 'start',
      4: 'approver',
      25: 'notifier',
    };
    for (let i = 0; i < activities.length; i++) {
      activities[i].type = typeMap[activities[i].ActivityType];
      activeMap[activities[i].ActivityCode] = activities[i];
    }
    const ruleMap = {};
    for (let i = 0; i < rules.length; i++) {
      const { PreActivityCode, PostActivityCode } = rules[i];
      if (!ruleMap[PreActivityCode]) {
        ruleMap[PreActivityCode] = [];
      }
      ruleMap[PreActivityCode].push(rules[i]);
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

    let maxId = Math.max(...ids);
    console.log(`maxId is------------  ${maxId}`);
    console.log(`activeMap is ---------`);
    console.log(activeMap);
    console.log(`ruleMap is -------------`);
    console.log(ruleMap);

    // 用一个二维数组记录可能存在的路线
    const lineArr = [[]];
    // 用一个map记录 节点关系 key为父节点id 值为lineArr中包括父节点id多数组
    const linesMap = {};
    let i = 0;
    // 生成可能的路线
    function getLineArr(code, index) {
      lineArr[index].push(code);
      // 找到下一个点
      const nextNodes = ruleMap[code];
      // 表示是最后一个节点
      if (!nextNodes) {
        return;
      }
      i--;
      // if (!linesMap[code]) {
      linesMap[code] = lineArr
        .filter(l => l.includes(code))
        .filter(l => !l.includes(endActivity));
      // }
      let lines = linesMap[code];
      for (let j = 0; j < nextNodes.length; j++) {
        for (let k = 0; k < lines.length; k++) {
          lineArr[++i] = getEffectArr(lines[k], null, code);
          getLineArr(nextNodes[j].PostActivityCode, i);
        }
      }
    }
    getLineArr(startCode, i);
    console.log(`lineArr is -----------`);
    console.log(lineArr);

    const tmpStartNode = JSON.parse(JSON.stringify(start));
    const ruleContainerMap = {};
    function getData(node) {
      const code = node.ActivityCode;
      // 找到下一个点
      const nextNodes = ruleMap[code];
      // 表示是最后一个节点
      if (!nextNodes) {
        return;
      }
      const len = nextNodes.length;
      const ruleContainer = new RuleContainer();
      if (len === 1) {
        node.childNode = activeMap[nextNodes[0].PostActivityCode];
        getData(node.childNode);
        return;
      }
      node.childNode = ruleContainer;
      // 将ruleContainer保存到ruleContainerMap中
      ruleContainerMap[ruleContainer.Id] = ruleContainer;
      for (let j = 0; j < len; j++) {
        ruleContainer.conditionNodes.push(nextNodes[j]);
        const nextCode = nextNodes[j];
        ruleContainer.childNode = findChild(lineArr, code);
        nextNodes[j].childNode = activeMap[nextCode.PostActivityCode];
        getData(activeMap[nextCode.PostActivityCode]);
      }
    }

    getData(tmpStartNode);
    console.log(`startNode is --------`);
    console.log(tmpStartNode);

    // 在二维数组中找到condition的childNode
    function findChild(lineArr, beginCode) {
      let result = null;
      let lines = lineArr.filter(line => line.includes(beginCode));
      lines = JSON.parse(JSON.stringify(lines));
      const [first, ...others] = lines.map(element =>
        trimArr(element, beginCode)
      );
      for (let i = 0; i < first.length; i++) {
        const isExit = others.every(line => line.includes(first[i]));
        if (isExit) {
          result = first[i];
          break;
        }
      }
      return result;
    }

    /**
     *  截取非空数组中指定开始值结束值 并返回新数组
     *  @example
     *  getEffectArr([1,2,3,4],null,3) 返回  [1,2,3];
     *  getEffectArr([1,2,3,4],2,3) 返回  [2,3];
     */
    function getEffectArr(arr, begin, end) {
      let beginIndex = 0;
      if (begin !== null) {
        beginIndex = arr.indexOf(begin);
      }
      const endIndex = arr.indexOf(end);
      const newArr = [...arr];
      return newArr.slice(beginIndex, endIndex + 1);
    }

    /**
     *  将数组中value前的截取调，并返回新数组
     *  @example
     *  trimArr([1,2,3,4,5],3) 返回 [4,5]
     */
    function trimArr(arr, value) {
      return [...arr.slice(arr.indexOf(value) + 1)];
    }
  },
  components: {
    Zoom,
    NodeWrap,
    BranchWrap,
    RenderNode,
    RenderNode2,
  },
};
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
