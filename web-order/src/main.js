import { createApp } from 'vue'
import { globalCookiesConfig } from 'vue3-cookies'
import App from './App.vue'
import store from './store'

globalCookiesConfig({
    expireTimes: "60 * 60 * 12",
    path: "/",
    domain: "",
    secure: true,
    sameSite: "None",
})

createApp(App)
    .use(store)
    .mount('#app')