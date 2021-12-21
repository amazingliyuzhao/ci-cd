import Vue from 'vue'
import App from './App.vue'
import LimeUI from 'test-components-buness';

Vue.use(LimeUI)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
