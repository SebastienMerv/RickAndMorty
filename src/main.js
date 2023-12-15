import { router } from '@/router'

import '@/assets/base.css'

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).use(router).mount('#app')
