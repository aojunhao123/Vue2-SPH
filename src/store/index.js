// 最大的仓库，用于管理其他模块的数据仓库

import Vue from "vue";
// 引入并使用vuex
import Vuex from 'vuex'
Vue.use(Vuex)

// 引入其他模块的store
import home from "./home";

export default new Vuex.Store({
    modules: {
        home
    }
})