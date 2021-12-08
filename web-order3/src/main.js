import axios from 'axios';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

library.add(fas, far);

const app = createApp(App);
app.config.globalProperties.$axios = axios;

app.use(store).use(router).component('fa', FontAwesomeIcon).mount('#app');

// createApp(App).use(store).use(router).mount('#app');
