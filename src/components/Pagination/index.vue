<template>
    <!-- 分页器 -->
    <div class="page">
        <div class="sui-pagination clearfix">
            <ul>
                <li class="prev" :class="{ disabled: pageNo === 1 }" @click.prevent="prev">
                    <a href="#">«上一页</a>
                </li>
                <!-- 首页码 -->
                <li :class="{ active: pageNo === 1 }" v-if="pageStart > 1" @click.prevent="goPageNo(1)"><a href="#">1</a>
                </li>
                <li class="dotted" v-if="pageStart > 2"><span>...</span></li>
                <li v-for="(item, index) in pageEnd" :key="index" v-show="item >= pageStart" @click.prevent="goPageNo(item)"
                    :class="{ active: item === pageNo }">
                    <a href="#">{{ item }}</a>
                </li>
                <li class="dotted" v-if="pageEnd < maxPage"><span>...</span></li>
                <li class="next" :class="{ disabled: pageNo === maxPage }" @click.prevent="next">
                    <a href="#">下一页»</a>
                </li>
            </ul>
            <div><span>共{{ maxPage }}页&nbsp;</span></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Pagination',
    props: ['total', 'pageSize', 'pageNo', 'continues'],
    computed: {
        // 总页码数量
        maxPage() {
            return Math.ceil(this.total / this.pageSize)
        },
        // 连续页码的开始
        pageStart() {
            // pageStart出现负数的情况(非正常情况1)
            if (this.pageNo < Math.floor(this.continues / 2))
                return 1
            // 最大分页数小于连续分页(非正常情况2)
            if (this.maxPage < this.continues)
                return 1
            // 分页结束等于最大分页页码(非正常情况3)
            if (this.pageEnd === this.maxPage)
                return this.pageEnd - this.continues + 1
            return this.pageNo - Math.floor(this.continues / 2)
        },
        // 连续页码的末尾
        pageEnd() {
            // 最大分页数小于连续分页(非正常情况3)
            if (this.maxPage < this.continues)
                return this.maxPage
            // pageStart出现负数的情况(非正常情况1)
            if (this.pageNo <= Math.floor(this.continues / 2))
                return this.continues
            // pageEnd大于最大页码(非正常情况2)
            if (this.pageNo + Math.floor(this.continues / 2) > this.maxPage)
                return this.maxPage
            return this.pageNo + Math.floor(this.continues / 2)
        },
    },
    methods: {
        // 跳转上一页
        prev() {
            // 判断当前页码是否为第一页
            if (this.pageNo === 1)
                return
            else this.$emit('getPageNo', this.pageNo - 1)
        },
        // 跳转下一页
        next() {
            // 判断当前页码是否为最后一页
            if (this.pageNo === this.maxPage)
                return
            else this.$emit('getPageNo', this.pageNo + 1)
        },
        // 点击指定页面跳转
        goPageNo(pageNo) {
            // 若用户点击的是当前页码则不进行跳转
            if (this.pageNo === pageNo) return
            this.$emit('getPageNo', pageNo)
        },
    }
}
</script>
<style lang="less" scoped>
.page {
    width: 733px;
    height: 66px;
    overflow: hidden;
    margin: auto;
    // float: right;

    .sui-pagination {
        margin: 18px 0;
        text-align: center;

        ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            // width: 540px;
            float: left;

            li {
                line-height: 18px;
                display: inline-block;

                a {
                    position: relative;
                    float: left;
                    line-height: 18px;
                    text-decoration: none;
                    background-color: #fff;
                    border: 1px solid #e0e9ee;
                    margin-left: -1px;
                    font-size: 14px;
                    padding: 9px 18px;
                    color: #333;
                }

                &.active {
                    a {
                        background-color: #fff;
                        color: #e1251b;
                        border-color: #fff;
                        cursor: default;
                    }
                }

                &.prev {
                    a {
                        background-color: #fafafa;
                    }
                }

                &.disabled {
                    a {
                        color: #999;
                        cursor: default;
                    }
                }

                &.dotted {
                    span {
                        margin-left: -1px;
                        position: relative;
                        float: left;
                        line-height: 18px;
                        text-decoration: none;
                        background-color: #fff;
                        font-size: 14px;
                        border: 0;
                        padding: 9px 18px;
                        color: #333;
                    }
                }

                &.next {
                    a {
                        background-color: #fafafa;
                    }
                }
            }
        }

        div {
            color: #333;
            font-size: 14px;
            float: left;
            margin-top: 10px;
            margin-left: 25px;
            // width: 241px;
        }
    }
}
</style>