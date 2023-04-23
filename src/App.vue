<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default {
  name: 'App',
  components: {
    Header,Footer
  },
  // 由于三级分类菜单的数据只需要获取一次，因此在根组件挂载时获取
  mounted() {
    // 派发action
    this.$store.dispatch('categoryList')
  }
}
</script>

<style>
</style>
