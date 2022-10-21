import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/auth/Login.vue'
import Auth from '@/components/layouts/Auth.vue'
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/login', component: Login, meta: { layout: Auth, guest: true }, name: 'login' },
        { path: '/register', component: Login, meta: { layout: Auth, guest: true }, name: 'register' },

        { path: '/', name: 'dashboard', component: () => import('../views/Dashboard.vue') },
    ]
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()

    if (!to.meta.guest) {
        if (authStore.token) {
            next();
        } else {
            next({ name: 'login' });
        }
    }

    next();
})

export default router
