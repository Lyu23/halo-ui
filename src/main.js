import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

const app = createApp(App)

import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'

import router from './plugins/router/index'
import i18n from '@/utils/lang'

import store from './plugins/stores'


app.use(ElementPlus)
app.use(router)
app.use(i18n)
app.use(store)


app.mount('#app')
