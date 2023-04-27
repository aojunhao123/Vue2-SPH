// 用于存储并管理home模块的数据

// 引入数据接口
import { getCategoryList, getBannerList, getFloorList } from "@/api"
const home = {
    // namespaced: true,
    // 数据源
    state: {
        // 三级分类菜单数据
        categoryList: [],
        // 首页轮播图数据
        bannerList: [],
        // 首页floor数据
        floorList: []
    },
    // 唯一修改数据源的地方
    mutations: {
        CATEGORYLIST(state, data) {
            state.categoryList = data
        },
        BANNERLIST(state, data) {
            state.bannerList = data
        },
        FLOORLIST(state, data) {
            state.floorList = data
        }
    },
    // 执行异步任务，书写业务逻辑
    actions: {
        async categoryList({ commit }) {
            let result = await getCategoryList()
            if (result.code === 200) {
                let arr = result.data
                arr.splice(15, 2)
                commit('CATEGORYLIST', arr)
            }
        },
        async bannerList({ commit }) {
            let result = await getBannerList()
            if (result.code === 200) {
                commit('BANNERLIST', result.data)
            }
        },
        async floorList({ commit }) {
            let result = await getFloorList()
            if (result.code === 200) {
                commit('FLOORLIST', result.data)
            }
        }
    },
    // 计算属性 
    getters: {

    }
}

export default home