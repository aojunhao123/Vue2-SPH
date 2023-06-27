import { reqTrade, reqAddress } from "@/api"

const trade = {
    state: {
        tradeInfo: {},
        address: []
    },
    mutations: {
        TRADEINFO(state, data) {
            state.tradeInfo = data
        },
        USERADDRESS(state, data) {
            state.address = data
        }
    },
    actions: {
        // 获取订单交易页信息
        async tradeInfo({ commit }) {
            let result = await reqTrade()
            if (result.code === 200) {
                commit('TRADEINFO', result.data)
            }
            else return Promise.reject(new Error('failed'))
        },
        // 获取用户地址
        async userAddress({ commit }) {
            let result = await reqAddress()
            if (result.code === 200) {
                commit('USERADDRESS', result.data)
            }
            else return Promise.reject(new Error('failed'))
        }
    },
    getters: {
        orderList(state) {
            return state.tradeInfo.detailArrayList || []
        }
    }
}

export default trade