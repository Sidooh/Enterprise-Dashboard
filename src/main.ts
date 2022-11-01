import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import { defaultConfig, plugin } from '@formkit/vue'

import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/main.css'
import 'bootstrap/dist/js/bootstrap.min.js'


axios.interceptors.response.use(response => {
        if (response.data && response.data.errors) return Promise.reject(response.data)

        return response
    }, async error => {
        if (error.response) {
            if (error.response.status === 401) {
                const authStore = useAuthStore()

                authStore.logout()

                await router.push({ name: 'login' })
            }
        }

        return Promise.reject(error)
    }
)
axios.defaults.baseURL = import.meta.env.VITE_ENTERPRISE_API_URL
axios.defaults.headers.post['Content-Type'] = 'application/json'

createApp(App).use(createPinia()).use(router).use(plugin, defaultConfig).mount('#app')

axios.defaults.headers.common['Authorization'] = "Bearer " + useAuthStore().token;
