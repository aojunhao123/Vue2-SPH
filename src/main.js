import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from './router'
// 引入store
import store from './store'
// 统一引入API
import * as API from '@/api'
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

// 引入element-UI
import { MessageBox, Button, Message } from 'element-ui'
Vue.use(Button)
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$message = Message

// 引入表单验证插件
import '@/plugins/validate'

// 引入vue-lazyload
// import VueLazyload from 'vue-lazyload'
// Vue.use(VueLazyload, {
//   loading: './assets/logo.png'
// })




// 关闭vue生产提示
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() {
    // 安装全局事件总线
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  }
}).$mount('#app')
