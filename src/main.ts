import { createApp } from 'vue'
import App from './App.vue'
import {router} from "@/routers/index"

import './style.css'
import './assets/index.css';


const app = createApp(App)
app.use(router)
app.mount('#app')
