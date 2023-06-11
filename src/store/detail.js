import { getDetailList, addToCart } from "@/api";
import { getUUID } from "@/utils/uuid_token";
const detail = {
    state: {
        detailList: {},
        // 游客唯一标识
        uuid_token: getUUID()
    },
    mutations: {
        DETAILLIST(state, data) {
            state.detailList = data
        }
    },
    actions: {
        // 获取商品详情信息
        async detailList({ commit }, skuId) {
            let result = await getDetailList(skuId)
            if (result.code === 200)
                commit('DETAILLIST', result.data)
        },
        // 添加商品进购物车/修改购物车中商品数量
        async addOrUpdateCart({ commit }, { skuId, skuNum }) {
            let result = await addToCart(skuId, skuNum)
            // 服务器返回此次添加商品进购物车操作是否成功
            if (result.code === 200) {
                return 'ok'
            }
            else {
                return Promise.reject(new Error('failed'))
            }
        }
    },
    getters: {
        categoryView(state) {
            return state.detailList.categoryView || {}
        },
        skuInfo(state) {
            return state.detailList.skuInfo || {}
        },
        spuSaleAttrList(state) {
            return state.detailList.spuSaleAttrList
        }
    }
}
export default detail