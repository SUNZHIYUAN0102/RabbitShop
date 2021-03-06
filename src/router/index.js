import { createRouter, createWebHashHistory, RouterView } from 'vue-router'
import Layout from '@/views/Layout.vue'
import Home from '@/views/home/index.vue'
import TopCategory from '@/views/category/index.vue'
import SubCategory from '@/views/category/sub.vue'
import Goods from '@/views/goods/index.vue'
import Login from '@/views/login/index.vue'
import LoginCallBack from '@/views/login/callback.vue'
import Cart from '@/views/cart/index.vue'
import store from '@/store'
import Checkout from '@/views/member/pay/checkout.vue'
import Pay from '@/views/member/pay/index.vue'
import MemberLayout from '@/views/member/Layout.vue'
import MemberHome from '@/views/member/home/index.vue'
import MemberOrder from '@/views/member/order/index.vue'
import MemberOrderDetail from '@/views/member/order/detail.vue'
import { h } from 'vue'

const routes = [{
    path: '/',
    component: Layout,
    children: [{
        path: '/',
        component: Home
    }, {
        path: '/category/:id',
        component: TopCategory
    }, {
        path: '/category/sub/:id',
        component: SubCategory
    }, {
        path: '/product/:id',
        component: Goods
    }, {
        path: '/cart',
        component: Cart
    }, {
        path: '/member/checkout',
        component: Checkout
    }, {
        path: '/member/pay',
        component: Pay
    }, {
        path: '/member',
        component: MemberLayout,
        children: [{
                path: '/member',
                component: MemberHome
            },
            {
                path: '/member/order',
                component: { render: () => h( < RouterView / > ) },
                children: [{
                    path: '',
                    component: MemberOrder
                }, {
                    path: ':id',
                    component: MemberOrderDetail
                }]
            }
        ]
    }]
}, {
    path: '/login',
    component: Login
}, {
    path: '/login/callback',
    component: LoginCallBack
}]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior() {
        return { left: 0, top: 0 }
    }
})

router.beforeEach((to, from, next) => {
    const { profile } = store.state.user
    if (!profile.token && to.path.startsWith('/member')) return next('/login?redirectUrl=' + encodeURIComponent(to.fullPath))

    next()
})

export default router