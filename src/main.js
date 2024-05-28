import './assets/main.css'
import ToastPlugin from 'vue-toast-notification'; //TOAST

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(ToastPlugin); // TOAST

app.use(createPinia())
app.use(router)

app.mount('#app')
