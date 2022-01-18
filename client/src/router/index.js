import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/screens/Home'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "login" */ '@/screens/Login')
    },
    {
        path: '/signup',
        name: 'SignUp',
        component: () => import(/* webpackChunkName: "signup" */ '@/screens/SignUp')
    },
    {
        path: '/s/:name',
        name: 'Sub',
        component: () => import(/* webpackChunkName: "sub" */ '@/screens/Sub')
    },
    {
        path: '/s/:subPermalink/:id',
        name: 'Post',
        component: () => import(/* webpackChunkName: "post" */ '@/screens/Post')
    },
    {
        path: '/u/:username',
        name: 'User',
        component: () => import(/* webpackChunkName: "user" */ '@/screens/User')
    },
    {
        path: '/create',
        name: 'CreatePost',
        component: () => import(/* webpackChunkName: "create" */ '@/screens/CreatePost')
    },
    {
        path: '/create/sub',
        name: 'CreateSub',
        component: () => import(/* webpackChunkName: "create_sub" */ '@/screens/CreateSubvue')
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
