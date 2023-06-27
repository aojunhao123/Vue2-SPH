<template>
    <!-- 我的订单 -->
    <div class="order-content">
        <div class="title">
            <h3>我的订单</h3>
        </div>
        <div class="chosetype">
            <table>
                <thead>
                    <tr>
                        <th width="29%">商品</th>
                        <th width="31%">订单详情</th>
                        <th width="13%">收货人</th>
                        <th>金额</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
            </table>
        </div>
        <div class="orders">

            <table class="order-item" v-for="item in records" :key="item.id">
                <thead>
                    <tr>
                        <th colspan="5">
                            <span class="ordertitle">{{ item.createTime }}&nbsp;订单编号:{{ item.outTradeNo }} <span
                                    class="pull-right delete"><img src="../images/delete.png"></span></span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item2, index) in item.orderDetailList" :key="item2.id">
                        <td width="60%">
                            <div class="typographic">
                                <img :src="item2.imgUrl">
                                <a href="#" class="block-text">{{ item2.skuName }}</a>
                                <span>x{{ item2.skuNum }}</span>
                                <a href="#" class="service">售后申请</a>
                            </div>
                        </td>
                        <td :rowspan="item.orderDetailList.length" v-if="index == 0" width="8%" class="center">{{
                            item.consignee }}</td>
                        <td :rowspan="item.orderDetailList.length" v-if="index == 0" width="13%" class="center">
                            <ul class="unstyled">
                                <li>总金额¥{{ item.totalAmount }}.00</li>
                                <li>在线支付</li>
                            </ul>
                        </td>
                        <td :rowspan="item.orderDetailList.length" v-if="index == 0" width="8%" class="center">
                            <a href="#" class="btn">{{ item.orderStatusName }} </a>
                        </td>
                        <td :rowspan="item.orderDetailList.length" v-if="index == 0" width="13%" class="center">
                            <ul class="unstyled">
                                <li>
                                    <a href="javascript:;" target="_blank">评价|晒单</a>
                                </li>
                            </ul>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
        <div class="choose-order">
            <Pagination :total="orderInfo.total" :pageSize="limit" :pageNo="page" :continues="5" @getPageNo="getPageNo">
            </Pagination>
        </div>
    </div>
</template>

<script>
export default {
    name: 'myOrder',
    data() {
        return {
            // 初始化参数
            page: 1, //当前页码
            limit: 3, // 每页展示的数据条数,
            orderInfo: {} //订单信息
        }
    },
    methods: {
        // 获取订单信息
        async getMyOrder() {
            const result = await this.$API.reqMyOrder(this.page, this.limit)
            if (result.code === 200) {
                this.orderInfo = result.data
            }
        },
        // 传递页码给分页器组件
        getPageNo(page) {
            this.page = page
            this.getMyOrder()
        }
    },
    computed: {
        records() {
            return this.orderInfo.records || []
        }
    },
    mounted() {
        this.getMyOrder()
    }
}
</script>

<style lang="less" scoped>
//订单部分
.order-content {
    margin: 0 20px;
    color: #666;

    //标题
    .title {
        margin-bottom: 22px;
        border: 1px solid #ddd;

        h3 {
            padding: 12px 10px;
            font-size: 15px;
            background-color: #f1f1f1;

        }
    }

    //表头
    .chosetype {
        margin-bottom: 15px;
        color: #666;

        table {
            border: 1px solid #e6e6e6;
            border-collapse: separate;
            border-radius: 2px;
            width: 100%;
            max-width: 100%;
            border-spacing: 0;

            th {
                padding: 6px 8px;
                color: #666;
                font-weight: 700;
                vertical-align: bottom;
                background-color: #f4f4f4;
                line-height: 18px;
                border-bottom: 1px solid #e6e6e6;
                font-size: 12px;
                text-align: left;
            }
        }
    }

    // 表单内容
    .orders {
        font-size: 12px;

        a {
            &:hover {
                color: #4cb9fc;
            }
        }

        table {
            border: 1px solid #e6e6e6;
            border-collapse: collapse;
            border-radius: 2px;
            width: 100%;
            margin-bottom: 18px;
            max-width: 100%;

            th {
                padding: 6px 8px;
                line-height: 18px;
                text-align: left;
                vertical-align: bottom;
                background-color: #f4f4f4;
                font-size: 12px;
                color: #666;

                .pull-right {
                    float: right;
                    cursor: pointer;

                    img {
                        margin-right: 10px;
                        vertical-align: middle;
                    }
                }
            }

            td {
                font-size: 12px;
                color: #666;
                padding: 6px 8px;
                line-height: 18px;
                text-align: left;
                vertical-align: middle;
                border: 1px solid #e6e6e6;

                &.center {
                    text-align: center;
                }

                .typographic {
                    img {
                        float: left;
                        margin-right: 10px;
                        max-width: 82px;
                        max-height: 82px;
                        width: auto;
                        height: auto;
                    }

                    a {
                        float: left;
                        min-width: 80px;
                        max-width: 250px;
                        color: #e1251b;

                        &.service {
                            color: #666;
                        }
                    }

                    span {
                        float: left;
                        min-width: 80px;
                        max-width: 250px;
                        text-align: center;
                    }

                }
            }

        }
    }

    // 分页
    .choose-order {
        .pagination {
            margin: 38px 0;

            ul {
                font-size: 0;
                display: inline-block;

                li {
                    display: inline-block;
                    padding: 4px 9px;
                    font-size: 14px;
                    border: 1px solid #e0e9ee;

                    &.prev,
                    &.next {
                        background-color: #fafafa;
                    }

                    &.prev {
                        border-right-color: #28a3ef;
                    }

                    &.page {
                        border-color: #28a3ef;
                        border-left: 0;

                        &.actived {
                            background-color: #28a3ef;

                            a {
                                color: #fff;
                            }

                        }
                    }
                }
            }

            div {
                display: inline-block;
                font-size: 14px;
                color: #333;
            }
        }
    }
}
</style>