import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from '@/stores/index.js'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/styles/common.scss'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
