import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './views/router'
import '@fortawesome/fontawesome-free/js/all.js';

const app = createApp(App) 

app.use(store)
app.use(router)

app.mount('#app')