<template>
  <div class="type-nav">
    <div class="container">
      <h2 class="all">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <div class="sort">
        <div class="all-sort-list2">
          <!-- 一级菜单 -->
          <!-- 利用事件委派为三级分类菜单的所有列表绑定路由跳转 -->
          <div class="item" v-for="(item, index) in categoryList" :key="item.categoryId"
            :class="{ active: currentIndex === index }" @mouseenter="showBlue(index)" @mouseleave="currentIndex = -1"
            @click.prevent="goSearch">
            <h3>
              <a href="" :data-categoryName="item.categoryName" :data-category1Id="item.categoryId">{{ item.categoryName
              }}</a>
            </h3>
            <div class="item-list clearfix">
              <div class="subitem">
                <!-- 二级菜单 -->
                <dl class="fore" v-for="item2 in item.categoryChild" :key="item2.categoryId">
                  <dt>
                    <a href="" :data-categoryName="item2.categoryName" :data-category2Id="item2.categoryId">{{
                      item2.categoryName }}</a>
                  </dt>
                  <dd>
                    <!-- 三级菜单 -->
                    <em v-for="item3 in item2.categoryChild" :key="item3.categoryId">
                      <a href="" :data-categoryName="item3.categoryName" :data-category3Id="item3.categoryId">{{
                        item3.categoryName }}</a>
                    </em>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "TypeNav",
  data() {
    return {
      // 该属性用于动态控制三级菜单列表样式
      currentIndex: -1,
    }
  },
  methods: {
    // 动态控制鼠标悬浮时列表的样式
    showBlue(index) {
      this.currentIndex = index
    },
    // 从三级分类菜单跳转到search路由(默认携带query参数)
    goSearch(e) {
      // 🔴当用户点击菜单,我们需要区分用户点击是否为超链接;以及点的是三级菜单中的哪一级
      let node = e.target
      // 对node.dataset进行解构赋值
      let { categoryname, category1id, category2id, category3id } = node.dataset
      // 若存在该自定义属性则说明用户点击的是超链接
      if (categoryname) {
        // 收集路由跳转所需携带的参数
        let location = { name: 'search' }
        let query = { categoryName: categoryname }
        // 进入该判断则说明用户点击的是一级菜单
        if (category1id) {
          query.category1Id = category1id
        }
        // 进入该判断则说明用户点击的是二级菜单
        else if (category2id) {
          query.category2Id = category2id
        }
        // 进入该判断则说明用户点击的是三级菜单
        else {
          query.category3Id = category3id
        }
        // 判断当前路由是否有params参数
        if (this.$route.params) {
          location.params = this.$route.params
        }
        location.query = query
        this.$router.push(location)
      }
    }
  },
  computed: {
    ...mapState({ categoryList: (state) => state.home.categoryList })
  }
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .active {
    background-color: skyblue;

    a {
      text-decoration: none;
    }

  }

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>