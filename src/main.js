// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import './directives'
import './components'
import store from './store'
import VueSweetalert2 from './plugins/vue-sweetalert2'
import Message from './plugins/message'
import './filters'
import md5 from 'md5'

import { mockArticles } from './mock/data'
import ls from './utils/localStorage.js'
import ss from './utils/sessionStorage.js'
import './mock'
import axios from './untils/axiosConfig';
Vue.prototype.$axios = axios

Vue.use(ElementUI)
Vue.use(VueSweetalert2)
Vue.use(Message)
Vue.use(md5)
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
