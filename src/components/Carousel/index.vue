<template>
    <div class="swiper-container" ref="swiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in list" :key="item.id">
                <img :src="item.imgUrl" />
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>
// 引入swiper及其功能模块
import { Swiper, Navigation, Pagination, Autoplay } from 'swiper'
export default {
    name: 'Carousel',
    props: ['list'],
    watch: {
        list: {
            immediate: true,
            handler() {
                this.$nextTick(() => {
                    Swiper.use([Navigation, Pagination, Autoplay])
                    new Swiper(this.$refs.swiper, {
                        loop: true,
                        autoplay: { disableOnInteraction: false },
                        // 如果需要分页器
                        pagination: {
                            el: '.swiper-pagination'
                        },
                        // 如果需要前进后退按钮
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },
                    })
                })
            }
        }
    }

}
</script>

<style lang="less" scoped>
.swiper-button-prev,
.swiper-button-next {
    display: none;
}

.swiper-container:hover {

    .swiper-button-prev,
    .swiper-button-next {
        display: block;
    }
}
</style>