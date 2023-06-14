import { deleteCart, getCartList, checkCart } from "@/api";

const shopcart = {
    state: {
        cartList: []
    },
    mutations: {
        CARTLIST(state, data) {
            // console.log(data)
            state.cartList = data
        }
    },
    actions: {
        // 获取购物车数据
        async cartList({ commit }) {
            let result = await getCartList()
            if (result.code === 200)
                commit('CARTLIST', result.data)
        },
        // 删除单个商品
        async deleteCartList({ commit }, skuId) {
            let result = await deleteCart(skuId)
            if (result.code === 200)
                return 'ok'
            else return Promise.reject(new Error('failed'))
        },
        // 勾选单个商品
        async checkCartGoods({ commit }, { skuId, isChecked }) {
            let result = await checkCart(skuId, isChecked)
            if (result.code === 200)
                return 'ok'
            else return Promise.reject(new Error('failed'))
        },
        // 删除全部选中的商品
        // 解构context对象
        deleteAllChecked({ dispatch, getters }) {
            // 定义一个数组用于存放promise对象
            let promiseAll = []
            // 遍历购物车中的商品,若该商品被勾选则进行删除
            getters.cartList.cartInfoList.forEach(item => {
                let promise = item.isChecked == 1 ? dispatch('deleteCartList', item.skuId) : ''
                // 将promise对象存入数组
                promiseAll.push(promise)
            });
            // 返回一个promise对象
            return Promise.all(promiseAll)
        },
        // 全选/反选购物车商品
        toggleSelectAll({ dispatch, getters }, isChecked) {
            // console.log(isChecked)
            let promiseAll = []
            getters.cartList.cartInfoList.forEach(item => {
                let promise = dispatch('checkCartGoods', { skuId: item.skuId, isChecked })
                promiseAll.push(promise)
            })
            return Promise.all(promiseAll)
        }
    },
    getters: {
        cartList(state) {
            return state.cartList[0] || {}
        }
    }
}
export default shopcart