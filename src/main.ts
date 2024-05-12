import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { defaultConfig, plugin } from '@formkit/vue'

import '@nabcellent/sui-vue/dist/style.css'
import './assets/main.css'

createApp(App).use(createPinia()).use(router).use(plugin, defaultConfig({
    config: {
        classes: {
            message: 'text-danger small'
        }
    }
})).mount('#app')