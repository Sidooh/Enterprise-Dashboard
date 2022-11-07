import { createRouter, createWebHistory } from 'vue-router'
import Login from './views/auth/Login.vue'
import Register from './views/auth/Register.vue'
import Auth from '@/components/layouts/Auth.vue'
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/login', name: 'login', component: Login, meta: { layout: Auth, guest: true } },
        {
            path: '/register',
            name: 'register',
            component: Register,
            meta: { layout: Auth, guest: true }
        },

        { path: '/', name: 'dashboard', component: () => import('./views/Dashboard.vue') },
        {
            path: '/voucher-types',
            name: 'voucher-types',
            component: () => import('./views/voucher-types/Index.vue'),
            children: [
                {
                    path: ':id',
                    name: 'voucher-types.show',
                    component: () => import('./views/voucher-types/Show.vue')
                }
            ]
        },
        {
            path: '/float',
            children: [
                { path: 'transactions', component: () => import('@/views/float/transactions/Index.vue') },
                {
                    path: 'requests', component: () => import('@/views/float/requests/Index.vue'), children: [
                        {
                            path: ':id',
                            name: 'float.accounts.show',
                            component: () => import('@/views/float/requests/Index.vue')
                        }
                    ]
                }
            ]
        },
        {
            path: '/accounts',
            children: [
                {
                    path: 'accounts', component: () => import('@/views/float/requests/Index.vue'), children: [
                        {
                            path: ':id',
                            name: 'accounts.show',
                            component: () => import('@/views/float/requests/Index.vue')
                        }
                    ]
                },
                { path: 'teams', component: () => import('@/views/float/transactions/Index.vue') }
            ]
        },
        {
            path: "/:pathMatch(.*)*",
            name: "not-found",
            component: () => import("@/views/Dashboard.vue"),
        },
    ],
    linkActiveClass: 'nav-active'
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()

    if (!to.meta.guest) {
        if (authStore.token) {
            return next();
        } else {
            localStorage.setItem('urlIntended', to.path)

            return next({ name: 'login' });
        }
    }

    next();
})

export default router
