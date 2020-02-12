import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: '',
    village_name: '',
    gates_list: [],
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setVillageName(state, village_name) {
      state.village_name = village_name;
    },
    setGatesList(state, gates_list) {
      state.gates_list = gates_list;
    },
  },
  actions: {},
  modules: {},
});
