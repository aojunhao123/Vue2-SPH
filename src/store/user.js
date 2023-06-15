// 该模块用于存储用户注册与登录相关功能

import { reqGetCode, reqRegister, reqLogin, reqUserInfo, reqLogout } from "@/api"
import { getToken, setToken, removeToken } from "@/utils/token"

const user = {
    state: {
        // 验证码
        code: '',
        // token
        token: getToken(),
        // 用户信息
        userInfo: {}
    },
    mutations: {
        GETCODE(state, data) {
            state.code = data
        },
        USERLOGIN(state, data) {
            state.token = data
        },
        USERINFO(state, data) {
            state.userInfo = data
        },
        USERLOGOUT(state) {
            // 清除vuex中的token
            state.token = ''
            // 清除vuex中的用户信息
            state.userInfo = {}
            // 清除本地token
            removeToken()
        }
    },
    actions: {
        // 获取验证码
        async getCode({ commit }, phone) {
            let result = await reqGetCode(phone)
            if (result.code === 200) {
                commit('GETCODE', result.data)
                return 'ok'
            }
            else return Promise.reject(new Error('failed'))
        },
        // 用户注册
        async userRegister({ commit }, user) {
            let result = await reqRegister(user)
            if (result.code === 200)
                return 'ok'
            else return Promise.reject(new Error('failed'))
        },
        // 用户登录
        async userLogin({ commit }, user) {
            let result = await reqLogin(user)
            if (result.code === 200) {
                commit('USERLOGIN', result.data.token)
                // 持久化存储token
                setToken(result.data.token)
                return 'ok'
            }
            else return Promise.reject(new Error('failed'))
        },
        // 获取用户信息
        async userInfo({ commit }) {
            let result = await reqUserInfo()
            if (result.code === 200) {
                commit('USERINFO', result.data)
                return 'ok'
            }
            else return Promise.reject(new Error('failed'))
        },
        // 用户退出登录
        async userLogout({ commit }) {
            let result = await reqLogout()
            if (result.code === 200) {
                commit('USERLOGOUT')
                return 'ok'
            }
            else return Promise.reject(new Error('failed'))
        }
    },
    getters: {}
}

export default user