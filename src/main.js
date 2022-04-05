import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import UI from '@/components/library/index.js'
import 'normalize.css'
import '@/assets/styles/common.less'
import '@/mock/index'

createApp(App).use(store).use(router).use(UI).mount('#app')