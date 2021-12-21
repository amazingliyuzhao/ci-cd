import Vue from 'vue';
import {
  Button, Select, Input, Upload, Message,
} from 'element-ui';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.use(Button);
Vue.use(Input);
Vue.use(Upload);
Vue.prototype.$message = Message;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
