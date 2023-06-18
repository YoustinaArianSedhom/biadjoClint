/*=========================================================================================
  File Name: main.js
  Description: main vue(js) file
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import Vue from "vue";
import App from "./App.vue";

// Vuesax Component Framework
import Vuesax from "vuesax";
import "material-icons/iconfont/material-icons.css"; //Material Icons
import "vuesax/dist/vuesax.css"; // Vuesax
import numeral from "numeral";
import numFormat from "vue-filter-number-format";
Vue.use(Vuesax);
Vue.filter("numFormat", numFormat(numeral));

import moment from "moment";

Vue.filter("formatDate", function(value) {
  if (value) {
    return moment(String(value)).format("DD/MM/YYYY HH:mm:ss");
  }
});

//Idle timeout
import IdleVue from "idle-vue";

const eventsHub = new Vue();

Vue.use(IdleVue, {
  eventEmitter: eventsHub,
  store,
  idleTime: 30000000, // 30 seconds,
  startAtIdle: false
});

// axios
import axios from "./axios.js";
Vue.prototype.$http = axios;

// Theme Configurations
import "../themeConfig.js";

// autocomplete html
// import DisableAutocomplete from "vue-disable-autocomplete";

// Vue.use(DisableAutocomplete);

// Auth0 Plugin
import AuthPlugin from "./plugins/auth";
Vue.use(AuthPlugin);

// ACL
import acl from "./acl/acl";

// Brain Tree Payment Gateway

// Globally Registered Components
import "./globalComponents.js";

// Styles: SCSS
import "./assets/scss/main.scss";

// Tailwind
import "@/assets/css/main.css";

// Vue Router
import router from "./router";

// Vuex Store
import store from "./store/store";

// i18n
import i18n from "./i18n/i18n";

// Vuexy Admin Filters
import "./filters/filters";

// Clipboard
import VueClipboard from "vue-clipboard2";
Vue.use(VueClipboard);

// Tour
import VueTour from "vue-tour";
Vue.use(VueTour);
require("vue-tour/dist/vue-tour.css");

// VeeValidate
import VeeValidate from "vee-validate";
Vue.use(VeeValidate);
/*eslint-disable */
VeeValidate.Validator.extend("lowCase", {
  getMessage: field => `The password must contain at least: 1 lowercase letter`,
  validate: value => {
    var strongRegex = new RegExp("^(?=.*[a-z])");
    return strongRegex.test(value);
  }
});
VeeValidate.Validator.extend("UpCase", {
  getMessage: field => `The password must contain at least: 1 uppercase letter`,
  validate: value => {
    var strongRegex = new RegExp("^(?=.*[A-Z])");
    return strongRegex.test(value);
  }
});

VeeValidate.Validator.extend("number", {
  getMessage: field => `The password must contain at least: 1 number`,
  validate: value => {
    var strongRegex = new RegExp("^(?=.*[0-9])");
    return strongRegex.test(value);
  }
});
VeeValidate.Validator.extend("SpecialChar", {
  getMessage: field =>
    `The password must contain at least: 1 special character`,
  validate: value => {
    var strongRegex = new RegExp("^(?=.*[!@#$%^&*])");
    return strongRegex.test(value);
  }
});
/* eslint-enable*/

//Vue-Select
import vSelect from "vue-select";
Vue.component("v-select", vSelect);

//
import VueSingleSelect from "vue-single-select";
Vue.component("vue-single-select", VueSingleSelect);

// Google Maps
import * as VueGoogleMaps from "vue2-google-maps";
Vue.use(VueGoogleMaps, {
  load: {
    // Add your API key here
    key: "YOUR_API_KEY",
    libraries: "places" // This is required if you use the Auto complete plug-in
  }
});

// Vuejs - Vue wrapper for hammerjs
import { VueHammer } from "vue2-hammer";
Vue.use(VueHammer);

import VueTelInput from "vue-tel-input";

Vue.use(VueTelInput);
// PrismJS
import "prismjs";
import "prismjs/themes/prism-tomorrow.css";

// Feather font icon
require("./assets/css/iconfont.css");

// Vue ScrollTo
var VueScrollTo = require("vue-scrollto");

Vue.use(VueScrollTo, {
  container: "body",
  duration: 3000,
  easing: "ease",
  offset: 0,
  force: true,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
});
// Vue select css
// Note: In latest version you have to add it separately
// import 'vue-select/dist/vue-select.css';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  // created () {
  //   	axios.interceptors.response.use(
  //           response => response.data, // simply return the response
  //   		error => {
  //   		    if (error.response.status === 401) { // if we catch a 401 error
  //   		     this.$store.dispatch('auth/logout') // force a log out
  //   		}
  //   		return Promise.reject(error) // reject the Promise, with the error as the reason
  //   	    }
  //   	)
  //     },
  acl,
  render: h => h(App)
}).$mount("#app");
