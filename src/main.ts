import { createApp } from 'vue'
import App from './App.vue'
import {router} from "@/routers/index"
import { createPinia } from 'pinia'
import './style.css'
import './assets/index.css';

const pinia = createPinia()
const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
