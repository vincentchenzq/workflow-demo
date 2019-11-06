import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: {},
  },
  mutations: {
    deleteNode(state) {},
    set_data(state, data) {
      state.data = data;
    },
  },
  actions: {},
});
