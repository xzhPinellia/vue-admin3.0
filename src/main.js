import Vue from "vue";
import VueCompositionApi from "@vue/composition-api";
import App from "./App.vue";
import store from "./store/index.js";
import router from "./router/index.js";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./router/premit";//路由守卫
import VCharts from 'v-charts'
// 自定义全局方法
import "./icons";

Vue.use(VCharts)
Vue.use(ElementUI);
Vue.use(VueCompositionApi);
Vue.config.productionTip = false;

// runtime（运行模式）
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
