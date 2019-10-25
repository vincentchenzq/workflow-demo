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