// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'bulma/css/bulma.css'

import moment from 'moment'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLocalStorage from 'vue-ls'
import VueMoment from 'vue-moment'
import VueSocket from 'vue-socket.io'

Vue.use(VueSocket, 'wss://streamer.cryptocompare.com')
Vue.use(VueMoment, moment)
Vue.use(VueLocalStorage)
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
