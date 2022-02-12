import { createRouter, createWebHashHistory } from 'vue-router'

import IdView from '../views/IdView.vue'
import TimeView from '../views/TimeView.vue'
import HashView from '../views/HashView.vue'
import CryptoView from '../views/CryptoView.vue'
import StringView from '../views/StringView.vue'

const routes = [
  {
    path: '/',
    name: 'id',
    component: IdView
  },
  {
    path: '/time',
    name: 'time',
    component: TimeView
  },
  {
    path: '/hash',
    name: 'hash',
    component: HashView
  },
  {
    path: '/crypto',
    name: 'crypto',
    component: CryptoView
  },
  {
    path: '/string',
    name: 'string',
    component: StringView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
