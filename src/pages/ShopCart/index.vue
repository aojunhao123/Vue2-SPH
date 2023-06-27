<template>
    <div class="cart">
        <h4>全部商品</h4>
        <div class="cart-main">
            <div class="cart-th">
                <div class="cart-th1">全部</div>
                <div class="cart-th2">商品</div>
                <div class="cart-th3">单价（元）</div>
                <div class="cart-th4">数量</div>
                <div class="cart-th5">小计（元）</div>
                <div class="cart-th6">操作</div>
            </div>
            <div class="cart-body">

                <!-- 购物车结构 -->
                <ul class="cart-list" v-for="item in cartInfoList" :key="item.id">
                    <li class="cart-list-con1">
                        <input type="checkbox" name="chk_list" :checked="item.isChecked"
                            @click="checkCartGoods(item.skuId, $event)">
                    </li>
                    <li class="cart-list-con2">
                        <img :src="item.imgUrl">
                        <div class="item-msg">{{ item.skuName }}</div>
                    </li>
                    <li class="cart-list-con4">
                        <span class="price">{{ item.skuPrice }}</span>
                    </li>
                    <li class="cart-list-con5">
                        <a href="javascript:void(0)" class="mins" @click="handler('minus', -1, item)">-</a>
                        <input autocomplete="off" type="text" :value="item.skuNum" minnum="1" class="itxt"
                            @change="handler('change', $event.target.value * 1, item)">
                        <a href="javascript:void(0)" class="plus" @click="handler('plus', 1, item)">+</a>
                    </li>
                    <li class="cart-list-con6">
                        <span class="sum">{{ item.skuNum * item.skuPrice }}</span>
                    </li>
                    <li class="cart-list-con7">
                        <a href="javascript:;" class="sindelet" @click="deleteCart(item.skuId)">删除</a>
                        <br>
                        <a href="#none">移到收藏</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="cart-tool">
            <div class="select-all">
                <input class="chooseAll" type="checkbox" :checked="isAllChecked" @click="toggleSelectAll($event)">
                <span>全选</span>
            </div>
            <div class="option">
                <a href="javascript:;" @click="deleteAllChecked">删除选中的商品</a>
                <a href="#none">移到我的关注</a>
                <a href="#none">清除下柜商品</a>
            </div>
            <div class="money-box">
                <div class="chosed">已选择
                    <span>{{ goodsCount }}</span>件商品
                </div>
                <div class="sumprice">
                    <em>总价(不含运费):</em>
                    <i class="summoney">{{ totalPrice }}</i>
                </div>
                <div class="sumbtn">
                    <router-link to="/trade" class="sum-btn">结算</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import throttle from 'lodash/throttle'
export default {
    name: 'ShopCart',
    data() {
        return {
            
        }
    },
    computed: {
        // ...mapState({
        //     cartList: (state) => state.shopcart.cartList
        // }),
        ...mapGetters(['cartList']),
        cartInfoList() {
            return this.cartList.cartInfoList || []
        },
        // 商品结算总价
        totalPrice() {
            let sum = 0
            this.cartInfoList.forEach(item => {
                // console.log(item)
                // 若商品处于未勾选状态,则不计入总价
                if (!item.isChecked)
                    return
                sum += item.skuNum * item.skuPrice
            });
            return sum
        },
        // 全选框勾选状态
        isAllChecked() {
            return this.cartInfoList.every(item => item.isChecked === 1)
        },
        // 待结算商品数
        goodsCount() {
            let sum = 0
            this.cartInfoList.forEach(item => {
                if (!item.isChecked)
                    return
                sum += item.skuNum
            });
            return sum
        },
    },
    methods: {
        // 获取用户购物车中的商品数据
        getData() {
            this.$store.dispatch('cartList')
        },

        // 处理用户对购物车中商品数量的修改
        // 参数1:用户对商品数量的操作类型(增加/减少/直接输入)
        // 参数2:商品数目的变化量(需要发送给服务器的数据)
        // 参数3:商品id
        handler: throttle(async function (type, variation, cart) {
            switch (type) {
                // 添加
                case "plus":
                    variation = '1'
                    break;
                // 减少
                case "minus":
                    //若当前商品数量为1则不对其进行减少
                    variation = cart.skuNum > 1 ? -1 : 0
                    break;
                // 用户直接输入
                case "change":
                    // 用户输入为非法字符或负数时
                    if (isNaN(variation) || variation < 0)
                        variation = 0
                    // 用户正常输入数字或小数时
                    else variation = parseInt(variation) - cart.skuNum
                    break;
            }
            try {
                // 派发action(将更新后的商品数量发送给服务器)
                await this.$store.dispatch('addOrUpdateCart', { skuId: cart.skuId, skuNum: variation })
                // 重新获取数据渲染页面
                this.getData()
            } catch (error) {
                alert(error.message)
            }
        }, 500),

        // 删除购物车数据
        deleteCart(skuId) {
            try {
                this.$store.dispatch('deleteCartList', skuId)
                // 重新渲染页面
                this.getData()
            } catch (error) {
                alert(error.message)
            }
        },

        // 修改购物车商品选中状态
        async checkCartGoods(skuId, event) {
            try {
                await this.$store.dispatch('checkCartGoods', { skuId, isChecked: event.target.checked ? '1' : '0' })
                this.getData()
            } catch (error) {
                alert(error.message)
            }
        },

        // 删除购物车中选中的全部商品
        async deleteAllChecked() {
            try {
                await this.$store.dispatch('deleteAllChecked')
                this.getData()
            } catch (error) {
                alert(error.message)
            }
        },

        // 全选/反选购物车商品
        async toggleSelectAll(event) {
            try {
                await this.$store.dispatch('toggleSelectAll', event.target.checked ? '1' : '0')
                this.getData()
            } catch (error) {
                alert(error.message)
            }
        },
    },
    mounted() {
        this.getData()
    },
}
</script>
<style lang="less" scoped>
.cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
        margin: 9px 0;
        font-size: 14px;
        line-height: 21px;
    }

    .cart-main {
        .cart-th {
            background: #f5f5f5;
            border: 1px solid #ddd;
            padding: 10px;
            overflow: hidden;

            &>div {
                float: left;
            }

            .cart-th1 {
                width: 25%;

                input {
                    vertical-align: middle;
                }

                span {
                    vertical-align: middle;
                }
            }

            .cart-th2 {
                width: 25%;
            }

            .cart-th3,
            .cart-th4,
            .cart-th5,
            .cart-th6 {
                width: 12.5%;

            }
        }

        .cart-body {
            margin: 15px 0;
            border: 1px solid #ddd;

            .cart-list {
                padding: 10px;
                border-bottom: 1px solid #ddd;
                overflow: hidden;

                &>li {
                    float: left;
                }

                .cart-list-con1 {
                    width: 15%;
                }

                .cart-list-con2 {
                    width: 35%;

                    img {
                        width: 82px;
                        height: 82px;
                        float: left;
                    }

                    .item-msg {
                        float: left;
                        width: 150px;
                        margin: 0 10px;
                        line-height: 18px;
                    }
                }

                .cart-list-con4 {
                    width: 10%;

                }

                .cart-list-con5 {
                    width: 17%;

                    .mins {
                        border: 1px solid #ddd;
                        border-right: 0;
                        float: left;
                        color: #666;
                        width: 6px;
                        text-align: center;
                        padding: 8px;
                    }

                    input {
                        border: 1px solid #ddd;
                        width: 40px;
                        height: 32px;
                        float: left;
                        text-align: center;
                        font-size: 14px;
                    }

                    .plus {
                        border: 1px solid #ddd;
                        border-left: 0;
                        float: left;
                        color: #666;
                        width: 6px;
                        text-align: center;
                        padding: 8px;
                    }
                }

                .cart-list-con6 {
                    width: 10%;

                    .sum {
                        font-size: 16px;
                    }
                }

                .cart-list-con7 {
                    width: 13%;

                    a {
                        color: #666;
                    }
                }
            }
        }
    }

    .cart-tool {
        overflow: hidden;
        border: 1px solid #ddd;

        .select-all {
            padding: 10px;
            overflow: hidden;
            float: left;

            span {
                vertical-align: middle;
            }

            input {
                vertical-align: middle;
            }
        }

        .option {
            padding: 10px;
            overflow: hidden;
            float: left;

            a {
                float: left;
                padding: 0 10px;
                color: #666;
            }
        }

        .money-box {
            float: right;

            .chosed {
                line-height: 26px;
                float: left;
                padding: 0 10px;
            }

            .sumprice {
                width: 200px;
                line-height: 22px;
                float: left;
                padding: 0 10px;

                .summoney {
                    color: #c81623;
                    font-size: 16px;
                }
            }

            .sumbtn {
                float: right;

                a {
                    display: block;
                    position: relative;
                    width: 96px;
                    height: 52px;
                    line-height: 52px;
                    color: #fff;
                    text-align: center;
                    font-size: 18px;
                    font-family: "Microsoft YaHei";
                    background: #e1251b;
                    overflow: hidden;
                }
            }
        }
    }
}
</style>