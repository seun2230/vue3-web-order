// import axios from 'axios';
import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

const app = createApp(App);
// app.config.globalProperties.$axios = axios;

app.use(store).use(router).mount('#app');

// createApp(App).use(store).use(router).mount('#app');
