import { deleteCart, getCartList, checkCart } from "@/api";

const shopcart = {
    state: {
        cartList: []
    },
    mutations: {
        CARTLIST(state, data) {
            console.log(data)
            state.cartList = data
        }
    },
    actions: {
        async cartList({ commit }) {
            let result = await getCartList()
            if (result.code === 200)
                commit('CARTLIST', result.data)
        },
        async deleteCartList({ commit }, skuId) {
            let result = await deleteCart(skuId)
            if (result.code === 200)
                return 'ok'
            else return Promise.reject(new Error('failed'))
        },
        async checkCartGoods({ commit }, { skuId, isChecked }) {
            let result = await checkCart(skuId, isChecked)
            if (result.code === 200)
                return 'ok'
            else return Promise.reject(new Error('failed'))
        }
    },
    getters: {
        cartList(state) {
            return state.cartList[0] || {}
        }
    }
}
export default shopcart