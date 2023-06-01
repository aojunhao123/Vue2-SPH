import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from './router'
// 引入store
import store from './store'
// 引入要全局注册的组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
// 引入mock数据
import '@/mock/mockServer'
// 引入swiper样式
import 'swiper/swiper.min.css'
import 'swiper/swiper-bundle.min.css'
// 注册全局组件
// 参数一：组件名，参数二：组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() {
    // 安装全局事件总线
    Vue.prototype.$bus = this
  }
}).$mount('#app')
