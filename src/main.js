import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入TypeNav
import TypeNav from '@/components/TypeNav'
// 注册全局组件
// 参数一：组件名，参数二：组件
Vue.component(TypeNav.name,TypeNav)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
