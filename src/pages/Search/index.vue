<template>
  <div>
    <TypeNav></TypeNav>
    <!--list-content-->
    <div class="main">
      <div class="py-container">
        <!--面包屑导航-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 商品分类 -->
            <li class="with-x" v-if="searchParams.categoryName">{{ searchParams.categoryName }}<i
                @click="removeCategoryName">×</i></li>
            <!-- 用户搜索关键字 -->
            <li class="with-x" v-if="searchParams.keyword">{{ searchParams.keyword }}<i @click="removeKeyword">×</i></li>
            <!-- 商品品牌 -->
            <li class="with-x" v-if="searchParams.trademark">{{ searchParams.trademark.split(':')[1] }}<i
                @click="removeTrademark">×</i>
            </li>
            <!-- 商品属性(tag) -->
            <li class="with-x" v-for="(item, index) in searchParams.props" :key="index">{{ item.split(':')[1] }}<i
                @click="removeAttr(index)">×</i></li>
          </ul>
        </div>
        <!-- selector -->
        <Selector :attrsList="attrsList" @getTrademark="getTrademark" @getProps="getProps"></Selector>
        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <!-- 动态绑定active样式 -->
                <li :class="{ active: searchParams.order.includes('1') }">
                  <a href="javascript:;" @click="toggleTotalOrder">综合
                    <!-- 动态决定箭头的显示以及上下朝向 -->
                    <i class="iconfont"
                      :class="{ 'icon-paixu': searchParams.order.includes('1:desc'), 'icon-xiangshang': searchParams.order.includes('1:asc') }">
                    </i>
                  </a>
                </li>
                <li :class="{ active: searchParams.order.includes('2') }">
                  <a href="javascript:;" @click="togglePriceOrder">价格
                    <!-- 动态决定箭头的显示以及上下朝向 -->
                    <i class="iconfont"
                      :class="{ 'icon-paixu': searchParams.order.includes('2:desc'), 'icon-xiangshang': searchParams.order.includes('2:asc') }">
                    </i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="item in goodsList" :key="item.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <a href="item.html" target="_blank"><img :src="item.defaultImg" /></a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ item.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="item.title">{{ item.title }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination :total="91" :pageSize="5" :continues="5"></Pagination>
        </div>
        <!--hotsale-->
        <div class="clearfix hot-sale">
          <h4 class="title">热卖商品</h4>
          <div class="hot-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/like_01.png" />
                  </div>
                  <div class="attr">
                    <em>Apple苹果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4088.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有700人评价</i>
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/like_03.png" />
                  </div>
                  <div class="attr">
                    <em>金属A面，360°翻转，APP下单省300！</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4088.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有700人评价</i>
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/like_04.png" />
                  </div>
                  <div class="attr">
                    <em>256SSD商务大咖，完爆职场，APP下单立减200</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4068.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有20人评价</i>
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/like_02.png" />
                  </div>
                  <div class="attr">
                    <em>Apple苹果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4088.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有700人评价</i>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Selector from './Selector'
import { mapGetters } from 'vuex';
export default {
  components: { Selector },
  data() {
    return {
      // 添加一个响应式数据(当该数据发生改变时页面也相应发生变化)，用于收集用户搜索后要向服务器发送的数据
      searchParams: {
        // 三级分类菜单
        category1Id: '',
        category2Id: '',
        category3Id: '',
        // 分类名称
        categoryName: '',
        // 用户搜索框输入的关键字
        keyword: '',
        // 商品的排序(价格/综合 升/降序)
        // 初始默认值为综合降序
        order: '1:desc',
        // 商品页当前页码(初始默认值为1)
        pageNo: 1,
        // 每页最多展示数据条数
        pageSize: 10,
        // 平台为商品添加的属性
        props: [],
        // 商标
        trademark: ''
      }
    }
  },
  computed: {
    ...mapGetters(['goodsList']),
    ...mapGetters(['attrsList'])
  },
  methods: {
    // 将派发action获取数据的操作封装在函数中，提高复用性
    getData() {
      this.$store.dispatch('searchList', this.searchParams)
    },
    // 删除面包屑导航中的分类名
    removeCategoryName() {
      // 将查询参数中相应参数置为undefined(该参数不会发送给服务器,节省带宽)
      this.searchParams.categoryName = undefined
      this.removeId()
      // 重新发送请求更新页面
      this.getData()
      // 此判断是为了确保清除地址栏中的query参数且保留params参数
      if (this.$route.params) {
        this.$router.push({ name: 'search', params: this.$route.params })
      }
    },
    // 删除面包屑导航中的关键字
    removeKeyword() {
      this.searchParams.keyword = undefined
      this.getData()
      if (this.$route.query) {
        this.$router.push({ name: 'search', query: this.$route.query })
      }
    },
    // 删除面包屑导航中的品牌
    removeTrademark() {
      this.searchParams.trademark = undefined
      this.getData()
    },
    // 删除面包屑导航中的平台售卖属性
    removeAttr(index) {
      // 将数组中相应元素清除
      this.searchParams.props.splice(index, 1)
      this.getData()
    },
    // 将清除分类id的操作单独封装成函数
    removeId() {
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
    },
    // 该函数用于接收子组件selector传递来的trademark数据
    getTrademark(trademark) {
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
      // 重新发起请求
      this.getData()
    },
    // 该函数用于接收子组件selector传递来的props数据
    getProps(id, attr, type) {
      // 整理参数格式
      let props = `${id}:${attr}:${type}`
      // 向数组中添加数据
      // 判断数组中是否有该元素
      if (this.searchParams.props.indexOf(props) === -1)
        this.searchParams.props.push(props)
      // 重新发起请求
      this.getData()
    },
    // 切换商品综合排序
    toggleTotalOrder() {
      // 判断此时商品是综合排序还是价格排序
      if (this.searchParams.order.includes('1')) {
        // 进入此判断则为综合排序
        // 判断此时商品是升序还是降序
        if (this.searchParams.order.includes('desc'))
          this.searchParams.order = '1:asc'
        else this.searchParams.order = '1:desc'
        // 重新发送请求
        this.getData()
      }
      else {
        // 进入此判断则当前商品为价格排序
        // 从价格排序切换到综合排序时默认为降序
        this.searchParams.order = '1:desc'
        this.getData()
      }
    },
    // 切换商品价格排序
    togglePriceOrder() {
      // 判断此时商品是综合排序还是价格排序
      if (this.searchParams.order.includes('2')) {
        // 进入此判断则为价格排序
        // 判断此时商品是升序还是降序
        if (this.searchParams.order.includes('desc'))
          this.searchParams.order = '2:asc'
        else this.searchParams.order = '2:desc'
        // 重新发送请求
        this.getData()
      }
      else {
        // 进入此判断则当前商品为综合排序
        // 从综合排序切换到价格排序时默认为降序
        this.searchParams.order = '2:desc'
        this.getData()
      }
    },
  },
  // 对路由实例进行监视,当携带参数发生变化时进行相应的页面变化
  watch: {
    $route() {
      // 路由发生变化时重新收集并合并参数
      Object.assign(this.searchParams, this.$route.query, this.$route.params)
      // 将整理好的参数发送给服务器
      this.getData()
      // 参数发送给服务器后将分类id清除(初始化)
      this.removeId()
    }
  },
  // 我们需要收集用户操作后的参数并发送给服务器,并根据参数给用户显示相应的页面
  created() {
    // 整理并合并参数
    Object.assign(this.searchParams, this.$route.query, this.$route.params)
  },
  mounted() {
    // 将整理好的参数发送给服务器
    this.getData()
  }
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .selector {
      border: 1px solid #ddd;
      margin-bottom: 5px;
      overflow: hidden;

      .logo {
        border-top: 0;
        margin: 0;
        position: relative;
        overflow: hidden;

        .key {
          padding-bottom: 87px !important;
        }
      }

      .type-wrap {
        margin: 0;
        position: relative;
        border-top: 1px solid #ddd;
        overflow: hidden;

        .key {
          width: 100px;
          background: #f1f1f1;
          line-height: 26px;
          text-align: right;
          padding: 10px 10px 0 15px;
          float: left;
        }

        .value {
          overflow: hidden;
          padding: 10px 0 0 15px;
          color: #333;
          margin-left: 120px;
          padding-right: 90px;

          .logo-list {
            li {
              float: left;
              border: 1px solid #e4e4e4;
              margin: -1px -1px 0 0;
              width: 105px;
              height: 52px;
              text-align: center;
              line-height: 52px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-weight: 700;
              color: #e1251b;
              font-style: italic;
              font-size: 14px;

              img {
                max-width: 100%;
                vertical-align: middle;
              }
            }
          }

          .type-list {
            li {
              float: left;
              display: block;
              margin-right: 30px;
              line-height: 26px;

              a {
                text-decoration: none;
                color: #666;
              }
            }
          }
        }

        .ext {
          position: absolute;
          top: 10px;
          right: 10px;

          .sui-btn {
            display: inline-block;
            padding: 2px 14px;
            box-sizing: border-box;
            margin-bottom: 0;
            font-size: 12px;
            line-height: 18px;
            text-align: center;
            vertical-align: middle;
            cursor: pointer;
            padding: 0 10px;
            background: #fff;
            border: 1px solid #d5d5d5;
          }

          a {
            color: #666;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;

                i {
                  position: relative;
                  left: 3px;
                  bottom: -2px;
                }
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  // i {
                  //   margin-left: -5px;
                  // }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
    }

    .hot-sale {
      margin-bottom: 5px;
      border: 1px solid #ddd;

      .title {
        font-weight: 700;
        font-size: 14px;
        line-height: 21px;
        border-bottom: 1px solid #ddd;
        background: #f1f1f1;
        color: #333;
        margin: 0;
        padding: 5px 0 5px 15px;
      }

      .hot-list {
        padding: 15px;

        ul {
          display: flex;

          li {
            width: 25%;
            height: 100%;

            .list-wrap {

              .p-img,
              .price,
              .attr,
              .commit {
                padding-left: 15px;
              }

              .p-img {
                img {
                  max-width: 100%;
                  vertical-align: middle;
                  border: 0;
                }
              }

              .attr {
                width: 85%;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
              }

              .price {
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  // i {
                  //   margin-left: -5px;
                  // }
                }
              }

              .commit {
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;
              }
            }
          }
        }
      }
    }
  }
}
</style>