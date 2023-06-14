// 该模块用于存储用户注册与登录相关功能

import { reqGetCode, reqRegister, reqLogin } from "@/api"

const user = {
    state: {
        // 验证码
        code: '',
        // token
        token: ''
    },
    mutations: {
        GETCODE(state, data) {
            state.code = data
        },
        USERLOGIN(state, data) {
            state.token = data
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
                return 'ok'
            }
            else return Promise.reject(new Error('failed'))
        }
    },
    getters: {}
}

export default user