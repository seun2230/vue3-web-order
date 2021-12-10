import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from '@/router/';
import 'normalize.css'; // css 초기화.

import '@fortawesome/fontawesome-free/js/all.js';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';


const app = createApp(App) 

app.use(store)
app.use(router)
app.use(ElementPlus);
app.mount('#app')