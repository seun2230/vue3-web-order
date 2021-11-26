import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './views/router'
import axios from 'axios'
axios.defaults.withCredentials = true;

const app = createApp(App) 

app.use(store)
app.use(router)

app.mount('#app')
