import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: {name: 'home'},
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/common',
    name: 'common',
    component: () => import('../views/common/common.vue'),
    children: [
      {
        path: 'home',
        name: 'home',
        meta: {title: '首页'},
        component: () => import('../views/home/home.vue')
      },
      {
        path: 'chat',
        name: 'chat',
        meta: {title: '消息'},
        component: () => import('../views/chat/index.vue')
      },
      {
        path: 'shopping-cart',
        name: 'shopping-cart',
        component: () => import('../views/shoppingCart/index.vue')
      },
      {
        path: 'user-center',
        name: 'user-center',
        meta: {title: '个人中心'},
        component: () => import('../views/userCenter/index.vue')
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
