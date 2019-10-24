<template>
  <div class="zoom">
    <a-button icon="minus" size="small" :disabled="scale===0" @click="minus"></a-button>
    <span>{{scale }}%</span>
    <a-button icon="plus" size="small" :disabled="scale===100" @click="add"></a-button>
  </div>
</template>

<script>
const STEP = 10;
export default {
  data() {
    return {
      scale: 100, // 缩放比例
    }
  },
  methods: {
    // 减
    minus() {
      if (this.scale >= STEP) {
        this.scale -= STEP;
        this.$emit('update:scale', this.scale)
      }
    },
    // 加
    add() {
      if (this.scale <= (100 - STEP)) {
        this.scale += STEP;
        this.$emit('update:scale', this.scale)
      }
    }
  }
}
</script>

<style lang="less" scoped>
// zoom
.zoom {
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  width: 125px;
  right: 40px;
  margin-top: 30px;
  z-index: 10;
}
</style>