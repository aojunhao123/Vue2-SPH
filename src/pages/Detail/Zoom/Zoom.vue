<template>
  <div class="spec-preview">
    <!-- 商品图片 -->
    <img :src="defaultImg" ref="img1" />
    <div class="event" @mousemove="handler"></div>
    <div class="big">
      <!-- 放大镜效果呈现的图片 -->
      <img :src="defaultImg" ref="img2" />
    </div>
    <!-- 鼠标悬浮图片的遮罩层 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  props: ['skuInfo'],
  computed: {
    defaultImg: {
      get() {
        return this.skuInfo.skuDefaultImg
      },
      set(newValue) {
        // 当该计算属性被修改时，将修改后的值赋给图片src属性
        this.$refs.img1.src = newValue
        this.$refs.img2.src = newValue
      }
    }
  },
  methods: {
    handler(e) {
      // 获取遮罩层和放大后的图片
      let mask = this.$refs.mask
      let big = this.$refs.img2
      // 获取遮罩层相对于父容器的水平偏移量和垂直偏移量
      let left = e.offsetX - mask.offsetWidth / 2
      let top = e.offsetY - mask.offsetHeight / 2
      // 为防止遮罩层超出父容器边界，设置约束条件
      if (left <= 0) left = 0
      if (left > mask.offsetWidth) left = mask.offsetWidth
      if (top <= 0) top = 0
      if (top > mask.offsetHeight) top = mask.offsetHeight
      // 修改mask和big的left和top
      mask.style.left = left + 'px'
      mask.style.top = top + 'px'
      big.style.left = -2 * left + 'px'
      big.style.top = -2 * top + 'px'

    }
  },
  mounted() {
    // 在需要获取数据的组件中绑定事件总线
    this.$bus.$on('getImage', (imageSrc) => {
      this.defaultImg = imageSrc.imgUrl
    })
  }
}
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover~.mask,
  .event:hover~.big {
    display: block;
  }
}
</style>