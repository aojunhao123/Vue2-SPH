// 该模块用于定义路由映射

import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
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
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
// 创建路由实例对象管理路由映射
const router = new VueRouter({
    routes: [
        {
            path: '/detail/:skuId',
            component: Detail
        },
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
        },
        {
            name: 'addcartsuccess',
            path: '/addcartsuccess',
            component: AddCartSuccess
        },
        {
            path: '/shopcart',
            component: ShopCart
        }
    ],
    // 控制页面滚动行为
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})

router.beforeEach(async (to, from, next) => {
    let token = store.state.user.token
    let name = store.state.user.userInfo.name
    // 若用户已登录
    if (token) {
        // 登录状态下禁止用户访问登录和注册路由
        if (to.path === '/login' || to.path === '/register') {
            alert('您已登录!!!')
            next('/')
        }
        // 若用户访问登录注册以外的其他路由
        else {
            // 判断是否获取了用户信息(用户信息存储在vuex中无法持久化)
            if (name) {
                next()
            }
            // 若无用户信息
            else {
                try {
                    // 派发action获取用户信息
                    await store.dispatch('userInfo')
                    next()
                } catch (error) {
                    // 可能出错的情况:token过期
                    // 清除token
                    await store.dispatch('userLogout')
                    // 重新登录
                    next('/login')
                }

            }
        }
    }
    // 若用户未登录
    else {
        // 想去哪就去哪
        next()
    }
})

export default router