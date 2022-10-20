import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/auth/Login.vue'
import Auth from '@/components/layouts/Auth.vue'
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/login', component: Login, meta: { layout: Auth, guest: true }, name: 'login' },

        { path: '/', name: 'home', component: HomeView },
        { path: '/about', name: 'about', component: () => import('../views/AboutView.vue') }
    ]
})

router.beforeEach(to => {
    const authStore = useAuthStore()

    if (!authStore.token && !to.meta.guest) return '/login'
})

export default router
