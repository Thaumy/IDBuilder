import {createRouter, createWebHashHistory} from 'vue-router'

import IdView from '@/components/IdView.vue'
import TimeView from '@/components/TimeView.vue'
import HashView from '@/components/HashView.vue'
import CryptoView from '@/components/CryptoView.vue'
import EncodingView from '@/components/EncodingView.vue'
import AboutView from '@/components/AboutView.vue'

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
        path: '/encoding',
        name: 'encoding',
        component: EncodingView
    },
    {
        path: '/about',
        name: 'about',
        component: AboutView
    }
]

export default createRouter({
    history: createWebHashHistory(),
    routes
})
