import Vue, { VueConstructor, PluginObject } from 'vue';
import LeButton from './components/button';
// import './style.scss';

export {
  LeButton,
};

const components: Array<PluginObject<Vue> | VueConstructor<Vue>> = [
  LeButton,
];

export default {
  install(vue: VueConstructor) {
    components.forEach((component) => {
      vue.use(component as PluginObject<Vue>);
    });
  },
};
