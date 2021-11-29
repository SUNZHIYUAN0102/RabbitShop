import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/views/Layout.vue'
import Home from '@/views/home/index.vue'
import TopCategory from '@/views/category/index.vue'
import SubCategory from '@/views/category/sub.vue'
import Goods from '@/views/goods/index.vue'

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
    }]
}]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior() {
        return { left: 0, top: 0 }
    }
})

export default router