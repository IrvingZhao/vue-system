import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/packages/theme-chalk/src/index.scss';

import Platform from "xlb-platform";

import module from '../src/index';

Vue.use(ElementUI);
Vue.use(Platform);

let vueConfig = Platform.getVueConfig([
    {
        name: "system",
        path: "/system",
        component: module.page,
        children: module.router
    }
]);

new Vue(vueConfig).$mount("#app");
