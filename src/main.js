import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueFire from "vuefire";
import Vuesax from "vuesax";
import vueEventCalendar from "vue-event-calendar";
import "vuesax/dist/vuesax.css";
import "material-icons/iconfont/material-icons.css";
import "vue-event-calendar/dist/style.css";
import { db } from "./firebase.js";

Vue.use(Vuesax);
Vue.use(VueFire);
Vue.use(vueEventCalendar, { locale: "pt-br" });
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
