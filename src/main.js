// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuetify from 'vuetify';
import VueTreeNavigation from 'vue-tree-navigation';


import 'vuetify/dist/vuetify.min.css';

// imports from node modules comes first before others
import App from './App';
import router from './router';
import store from './store/store';

Vue.config.productionTip = false;

Vue.use(Vuetify);
Vue.use(VueTreeNavigation);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
