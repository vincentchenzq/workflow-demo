import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import 'lib-flexible'

Vue.use(Vant);

import { login } from './apis'

Vue.config.productionTip = false

login({
  phone:16677778888,
  password:123456
}).then(response=>{
  const data = response.data;
  const token = data.token;
  const village_name = data.village_name;
  const gates_list = data.gates_list;
  store.commit('setToken',token)
  store.commit('setVillageName',village_name)
  store.commit('setGatesList',gates_list.map(item => {
    return {
      text:item.gate_number,
      value:item.id
    }
  }))
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})
