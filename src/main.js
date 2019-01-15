import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueFire from "vuefire";
import Vuesax from "vuesax";
import "vuesax/dist/vuesax.css";
import "material-icons/iconfont/material-icons.css";
import { db } from "./firebase.js";

Vue.use(Vuesax);
Vue.use(VueFire);
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
