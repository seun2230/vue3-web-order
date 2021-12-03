import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import ElementPlus from 'element-plus'
import VueRouter from './views/router'
import BootstrapVue3 from 'bootstrap-vue-3'


import 'element-plus/dist/index.css'
import '@fortawesome/fontawesome-free/js/all.js'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

createApp(App)
  .use(BootstrapVue3)
  .use(store)
  .use(ElementPlus)
  .use(VueRouter)
  .mount('#app')