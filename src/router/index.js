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
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import MyOrder from '@/pages/Center/MyOrder'
import GroupOrder from '@/pages/Center/GroupOrder'
// 创建路由实例对象管理路由映射
const router = new VueRouter({
    routes: [
        {
            path: '/detail/:skuId',
            // 路由懒加载
            component: () => import('@/pages/Detail')
        },
        {
            path: '/',
            component: () => import('@/pages/Home')
        },
        {
            name: 'search',
            // 声明params参数,'?'代表该参数非必要
            path: '/search/:keyword?',
            component: () => import('@/pages/Search')
        },
        {
            path: '/login',
            component: () => import('@/pages/Login')
        },
        {
            path: '/register',
            component: () => import('@/pages/Register')
        },
        {
            name: 'addcartsuccess',
            path: '/addcartsuccess',
            component: () => import('@/pages/AddCartSuccess')
        },
        {
            path: '/shopcart',
            component: () => import('@/pages/ShopCart')
        },
        {
            path: '/trade',
            component: () => import('@/pages/Trade'),
            // 路由独享守卫
            beforeEnter(to, from, next) {
                // 只允许用户通过shopcart路由访问该路由
                if (from.path === '/shopcart') {
                    next()
                }
                else {
                    Vue.prototype.$message({
                        message: '暂无权限查看!自动为您跳转到购物车~',
                        type: 'warning',
                        center: true,
                        duration: 1000 // 弹框持续时间:1000 (ms)
                    })
                    next('/shopcart')
                }
            }
        },
        {
            path: '/pay',
            component: () => import('@/pages/Pay'),
            // 只允许从trade路由跳转到pay路由
            beforeEnter(to, from, next) {
                if (from.path === '/trade') {
                    next()
                }
                else {
                    Vue.prototype.$message({
                        message: '暂无权限查看!请先去购物~',
                        type: 'warning',
                        center: true,
                        duration: 1000 // 弹框持续时间:1000 (ms)
                    })
                    next('/shopcart')
                }
            }
        },
        {
            path: '/paysuccess',
            component: () => import('@/pages/PaySuccess'),
            // 只允许用户从pay路由进入到paysuccess
            beforeEnter(to, from, next) {
                if (from.path === '/trade') {
                    next()
                }
                else {
                    Vue.prototype.$message({
                        message: '暂无权限查看!请先去购物~',
                        type: 'warning',
                        center: true,
                        duration: 1000 // 弹框持续时间:1000 (ms)
                    })
                    next('/shopcart')
                }
            }
        },
        {
            path: '/center',
            component: () => import('@/pages/Center'),
            // 配置二级路由
            children: [
                {
                    path: 'myorder',
                    component: MyOrder
                },
                {
                    path: 'grouporder',
                    component: GroupOrder
                },
                {
                    path: '',
                    // 重定向到myorder路由
                    redirect: 'myorder'
                }
            ]
        }
    ],
    // 控制页面滚动行为
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})

// 全局路由前置守卫
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
        // 用户想访问以下路由
        let toPath = to.path;
        if (toPath.indexOf('/trade') !== -1 || toPath.indexOf('/center') !== -1 || toPath.indexOf('/pay') !== -1) {
            // 弹出警告消息
            Vue.prototype.$message({
                message: '请先登录!',
                type: 'warning',
                center: true,
                duration: 1000
            })
            // 跳转至登录页面,同时将用户未登录时想去的路由路径存储在query参数中
            next('/login?redirect=' + toPath)
        }
        // 若访问其他路由则放行
        else {
            next()
        }
    }
})

export default router