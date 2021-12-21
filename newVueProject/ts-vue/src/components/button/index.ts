import { VueConstructor } from 'vue';
import LeButton from './button.vue';

(LeButton as any).install = (Vue: VueConstructor) => {
  Vue.component('LeButton', LeButton);
};

export default LeButton;
