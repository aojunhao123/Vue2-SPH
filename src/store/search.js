import { getSearchInfo } from "@/api";
const search = {
    state: {
        searchList: {}
    },
    mutations: {
        SEARCHLIST(state, data) {
            state.searchList = data
        }
    },
    actions: {
        // 解构赋值为第二个形参设置默认值
        async searchList({ commit }, params = {}) {
            let result = await getSearchInfo(params)
            if (result.code === 200) {
                commit('SEARCHLIST', result.data)
            }
        }
    },
    getters: {
        // 若网络无问题或请求无问题，则应该返回响应数据
        // 若网络或请求出问题，此时返回undefined，但我们应该返回一个空数组用于应对这种情况
        goodsList(state) {
            return state.searchList.goodsList || []
        },
        attrsList(state) {
            return state.searchList.attrsList || []
        },
        trademarkList(state) {
            return state.searchList.trademarkList || []
        }
    }
}
export default search