<template>
  <div class="add-node-btn-box">
    <div class="add-node-btn">
      <a-popover placement="right" trigger="click">
        <template slot="content">
          <div class="popover-content">
            <div class="add-node-popover-item">
              <a-icon type="user" :style="{ fontSize: '35px' }" />
              <br />审批人
            </div>
            <div class="add-node-popover-item">
              <a-icon type="mail" :style="{ fontSize: '35px' }" />
              <br />抄送人
            </div>
            <div class="add-node-popover-item">
              <a-icon type="branches" :style="{ fontSize: '35px' }" />
              <br />条件分支
            </div>
          </div>
        </template>
        <template slot="title">
          <!-- <span>Title</span> -->
        </template>
        <a-button icon="plus" shape="circle" type="primary" size="small"></a-button>
      </a-popover>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.add-node-btn-box {
  width: 240px;
  display: inline-flex;
  flex-shrink: 0;
  position: relative;
}
.add-node-btn-box:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  margin: auto;
  width: 2px;
  height: 100%;
  background-color: #cacaca;
}
.add-node-btn {
  user-select: none;
  width: 240px;
  padding: 20px 0 32px;
  display: flex;
  justify-content: center;
  flex-shrink: 0;
  flex-grow: 1;
}
.popover-content {
  display: flex;
}
.add-node-popover-item {
  margin-right: 10px;
  cursor: pointer;
  text-align: center;
  flex: none;
  color: #191f25 !important;
}
</style>