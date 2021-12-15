import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import ElementPlus from 'element-plus'
import VueRouter from './views/router.js'
import axios from 'axios'

axios.defaults.withCredentials = true;

import 'normalize.css'  //  css 초기화

import 'element-plus/dist/index.css'
import './scss/index.scss';  //  글로벌 css

import '@fortawesome/fontawesome-free/js/all.js'

createApp(App)
  .use(store)
  .use(ElementPlus)
  .use(VueRouter)
  .mount('#app')
