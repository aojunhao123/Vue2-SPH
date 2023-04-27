<template>
  <div>
    <!-- 全局组件 -->
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="item in floorList" :key="item.id" :list="item"></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ListContainer from "./ListContainer";
import Recommend from "./Recommend";
import Rank from "./Rank";
import Like from "./Like";
import Floor from "./Floor";
import Brand from "./Brand";
export default {
  name: "Home",
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  computed: {
    ...mapState({ floorList: state => state.home.floorList })
  },
  mounted() {
    this.$store.dispatch('floorList')
  }
};
</script>

<style></style>