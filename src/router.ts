import { createRouter, createWebHistory } from 'vue-router'
import Login from './views/auth/Login.vue'
import Register from './views/auth/Register.vue'
import { useAuthStore } from "@/stores/auth";
import Auth from '@/components/layouts/Auth.vue'
import Dashboard from './views/dashboard/Index.vue'
import Profile from './views/Profile.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/login', name: 'login', component: Login, meta: { layout: Auth, auth: false } },
        {
            path: '/register',
            name: 'register',
            component: Register,
            meta: { layout: Auth, auth: false }
        },

        { path: '/', name: 'dashboard', component: Dashboard, meta: { auth: true } },
        { path: '/profile', name: 'profile', component: Profile, meta: { auth: true } },
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
            ], meta: { auth: true }
        },
        {
            path: '/voucher-transactions', children: [
                { path: ':id', name: 'voucher-transactions.show', redirect: '/' }
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
            ], meta: { auth: true }
        },
        {
            path: '/accounts',
            component: () => import('@/views/accounts/Index.vue'),
            children: [
                {
                    path: ':id',
                    name: 'accounts.show',
                    component: () => import('@/views/accounts/Index.vue')
                }
            ], meta: { auth: true }
        },
        {
            path: '/teams',
            component: () => import('@/views/teams/Index.vue'),
            children: [
                {
                    path: ':id',
                    name: 'teams.show',
                    component: () => import('@/views/teams/Index.vue')
                }
            ], meta: { auth: true }
        },
        {
            path: "/:pathMatch(.*)*",
            name: "not-found",
            redirect: () => ({ name: 'dashboard' })
        },
    ],
    linkActiveClass: 'nav-active'
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()

    if (to.meta.auth && !authStore.auth) {
        localStorage.setItem('urlIntended', to.path)

        next({ name: 'login' });
    } else if (!to.meta.auth && authStore.auth) {
        next({ name: 'dashboard' });
    } else {
        next()
    }
})

export default router
