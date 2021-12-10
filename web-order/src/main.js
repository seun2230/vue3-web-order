import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import ElementPlus from 'element-plus'
import VueRouter from './views/router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

library.add(fas, far);

import 'normalize.css'  //  css 초기화

import 'element-plus/dist/index.css'
import './scss/index.scss';  //  글로벌 css

import '@fortawesome/fontawesome-free/js/all.js'

createApp(App)
  .use(store)
  .use(ElementPlus)
  .use(VueRouter)
  .component('fa', FontAwesomeIcon)
  .mount('#app')
