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
import firebase from "firebase";

Vue.use(Vuesax);
Vue.use(VueFire);
Vue.use(vueEventCalendar, { locale: "pt-br", color: "rgba(0,0,0,.1)" });
Vue.config.productionTip = false;

let app = "";

firebase.auth().onAuthStateChanged(() => {
  Vue.prototype.$autenticado = firebase.auth().currentUser;
  if (!app) {
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount("#app");
  }
});
// Pull request
