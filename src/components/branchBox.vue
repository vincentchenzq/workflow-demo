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
        <!-- TODO -->
        <template v-for="(it,idx) in getNodeList(item)">
          <!-- <BranchWrap :conditionNodes="it.childNode.conditionNodes" v-if="isRoute(it)"></BranchWrap> -->
          <BranchWrap v-if="isRoute(it)">
            <BranchBox :conditionNodes="it.childNode.conditionNodes"></BranchBox>
            <AddNodeBtn></AddNodeBtn>
          </BranchWrap>
          <!-- <NodeWrap :nodeType="it.childNode.type" v-if="isNode(it)"></NodeWrap> -->
          <NodeWrap v-if="isNode(it)">
            <Node :nodeType="it.childNode.type"></Node>
            <AddNodeBtn></AddNodeBtn>
          </NodeWrap>
        </template>

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
import Node from './node';
export default {
  name: "BranchBox",
  props: {
    conditionNodes: {
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
    },
    // 获取树形数据的node节点
    getNodeList(item) {
      function isNode(data) {
        return data.type !== 'route'
      }
      function isRoute(data) {
        return data.type === 'route'
      }
      var result = [];
      var flatArr = function (dataJson) {
        if (isNode(dataJson)) {
          result.push(dataJson);
          if (dataJson.childNode) {
            flatArr(dataJson.childNode)
          }
        }
        if (isRoute(dataJson)) {
          result.push(dataJson)
        }
      }
      flatArr(item);
      return result
    }
  },
  components: {
    AddNodeBtn,
    BranchWrap,
    NodeWrap,
    Node
  }
}
</script>