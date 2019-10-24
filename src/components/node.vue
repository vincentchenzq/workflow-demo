<template>
  <div class="node-wrap-box" :class="{'start-node':nodeType ==='startNode'}">
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
const NODE_CONFIG = {
  startNode: {
    background: 'background:rgb(87, 106, 149)',
    title: '发起人',
    text: '所有人'
  },
  approveNode: {
    background: 'background:rgb(255, 148, 62)',
    title: '审批人',
    text: '发起人自选'
  },
  sendNode: {
    background: 'background:rgb(50, 150, 250)',
    title: '抄送人',
    text: '发起人自选'
  },
}
export default {
  props: {
    nodeType: {
      type: String,
      default: 'startNode'
    }
  },
  computed: {
    nodeConfig() {
      console.log(this.nodeType)
      return NODE_CONFIG[this.nodeType];
    }
  }
}
</script>

<style lang="less" scoped>
.node-wrap-box {
  display: inline-flex;
  flex-direction: column;
  position: relative;
  width: 220px;
  min-height: 72px;
  flex-shrink: 0;
  background: #fff;
  border-radius: 4px;
  cursor: pointer;
}
.node-wrap-box:before {
  content: '';
  position: absolute;
  top: -12px;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  width: 0;
  height: 4px;
  border-style: solid;
  border-width: 8px 6px 4px;
  border-color: #cacaca transparent transparent;
  background: #f5f5f7;
}
.node-wrap-box.start-node:before {
  display: none;
}

.node-wrap-box:after {
  pointer-events: none;
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  border-radius: 4px;
  border: 1px solid transparent;
  transition: all 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
}

.node-wrap-box.active:after,
.node-wrap-box:active:after,
.node-wrap-box:hover:after {
  border: 1px solid #3296fa;
  box-shadow: 0 0 6px 0 rgba(50, 150, 250, 0.3);
}

.node-wrap-box.active .close,
.node-wrap-box:active .close,
.node-wrap-box:hover .close {
  display: block;
}

.node-wrap-box.error:after {
  border: 1px solid #f25643;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
}

.node-wrap-box .title {
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 16px;
  padding-right: 30px;
  width: 100%;
  height: 24px;
  line-height: 24px;
  font-size: 12px;
  color: #fff;
  text-align: left;
  background: #576a95;
  border-radius: 4px 4px 0 0;
}

.node-wrap-box .title .iconfont {
  font-size: 12px;
  margin-right: 5px;
}

.node-wrap-box .placeholder {
  color: #bfbfbf;
}

.node-wrap-box .close {
  display: none;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  font-size: 14px;
  color: #fff;
  border-radius: 50%;
  text-align: center;
  line-height: 20px;
}

.node-wrap-box .content {
  position: relative;
  font-size: 14px;
  padding: 16px;
  padding-right: 30px;
}

.node-wrap-box .content .text {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.node-wrap-box .content .arrow {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 14px;
  font-size: 14px;
  color: #979797;
}

.start-node.node-wrap-box .content .text {
  display: block;
  white-space: nowrap;
}
</style>