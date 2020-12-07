import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import axios from 'axios'
import VShowSlide from 'v-show-slide'

// import Buefy from "buefy";
// import "buefy/dist/buefy.css";

// import VueFlashMessage from "VueFlashMessage";
Vue.prototype.$http = axios
Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VShowSlide)
// Vue.use(Buefy);
// Vue.use(VueFlashMessage)

new Vue({
    router,
    render: (h) => h(App),
}).$mount("#app");
