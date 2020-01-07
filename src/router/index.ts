import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: {name: 'home'},
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
        path: 'mine',
        name: 'mine',
        meta: {title: '个人中心'},
        component: () => import('../views/mine/index.vue')
      },
    ]
  }
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.afterEach( to => { document.title = to.meta.title })

export default router
