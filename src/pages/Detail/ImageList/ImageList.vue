<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item, index) in skuImageList" :key="item.id">
        <img :src="item.imgUrl" @click="toggleImage(index)" :class="{ active: curIndex === index }">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>

// 引入swiper及其功能模块
import { Swiper, Navigation } from 'swiper'

export default {
  name: "ImageList",
  props: ['skuImageList'],
  data() {
    return {
      // 控制选中图片时的边框样式
      curIndex: 0
    }
  },
  methods: {
    toggleImage(index) {
      this.curIndex = index
      // 在需要发送数据的组件中触发总线回调
      this.$bus.$emit('getImage', this.skuImageList[index])
    }
  },
  watch: {
    skuImageList: {
      handler() {
        this.$nextTick(() => {
          Swiper.use([Navigation])
          new Swiper(this.$refs.cur, {
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            slidesPerView: 2,
            slidesPerGroup: 1
          })
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    // width: 56px;
    width: auto;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      &:hover {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;

    &::after {
      font-size: 12px;
    }
  }
}
</style>