// 该模块用于定义路由映射

import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter)

// 重写push和replace方法
// 将原生方法保存一份
let originalReplace = VueRouter.prototype.replace
let originalPush = VueRouter.prototype.push

// 参数一:路由跳转的配置对象
// 参数二、三:跳转成功、失败的回调
VueRouter.prototype.push = function (location, resolve, reject) {
    // 若设置了对应的成功、失败回调则直接进行跳转
    if (resolve || reject) {
        // 使用call方法修改原生push方法的指向(当前路由组件.$route)
        return originalPush.call(this, location, resolve, reject)
    }
    // 若未设置成功、失败的回调则手动设置
    originalPush.call(this, location, () => { }, () => { })
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    // 若设置了对应的成功、失败回调则直接进行跳转
    if (resolve || reject) {
        return originalReplace.call(this, location, resolve, reject)
    }
    // 若未设置成功、失败的回调则手动设置
    originalReplace.call(this, location, () => { }, () => { })
}


// 引入路由组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'

// 创建路由实例对象管理路由映射
const router = new VueRouter({
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            name: 'search',
            // 声明params参数,'?'代表该参数非必要
            path: '/search/:keyword?',
            component: Search
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/register',
            component: Register
        }
    ]
})

export default router