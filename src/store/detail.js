import { getDetailList } from "@/api";
const detail = {
    state: {
        detailList: {}
    },
    mutations: {
        DETAILLIST(state, data) {
            state.detailList = data
        }
    },
    actions: {
        async detailList({ commit }, skuId) {
            let result = await getDetailList(skuId)
            if (result.code === 200)
                commit('DETAILLIST', result.data)
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