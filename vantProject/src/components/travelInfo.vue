<template>
  <div>
    <van-cell-group title="房间号">
    <span>天然居</span>-<input readonly class="floor" @click="showModal = true" />-<input @input="handleInput" />
      <person-info v-for="(item, index) in personList" :key="index" />
    </van-cell-group>
    <!-- <van-popup v-model="showModal"> -->
        <van-popup
            v-model="showModal"
            position="bottom"
            :style="{ height: '30%' }"
        >
        <van-picker :columns="columns" @change="onChange" />
    </van-popup>
  </div>
</template>

<script>
import debounce from 'lodash.debounce';
// import throttle from 'lodash.throttle';

import PersonInfo from "./personInfo";
export default {
  props: {
    personList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
        showModal:false,
        columns:[1,2,3,4,5,6,7,8,9,9,9]
    };
  },
  methods: {
      handleInput(e) {
          this.search(e.target.value)
      },
      search(va) {
          console.log(va)
      },
      onChange( ) {}
  },
  mounted() {
      this.search = debounce(this.search,300)
  },
  components: {
    PersonInfo
  }
};
</script>

<style lang="less" scoped>
.floor {
    border:none;
    outline: none;
    box-shadow: none;
    border-bottom: 1px solid;
}
</style>