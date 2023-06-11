// 该模块用于对外暴露数据接口

// 引入axios模块
import request from './request'
import mockRequest from './mockRequest'
// 对外暴露数据接口
// 获取三级分类菜单数据
export const getCategoryList = () => request.get('/product/getBaseCategoryList')
// 该请求方法至少传递一个空对象
// 获取用户搜索的商品数据
export const getSearchInfo = (data) => request({ url: '/list', method: 'post', data: data })
// 轮播图数据
export const getBannerList = () => mockRequest.get('/banners')
export const getFloorList = () => mockRequest.get('/floors')
// 获取商品详情数据
export const getDetailList = (skuId) => request.get(`/item/${skuId}`)
// 向购物车中添加商品/修改购物车中商品数量
export const addToCart = (skuId, skuNum) => request.post(`/cart/addToCart/${skuId}/${skuNum}`)
// 获取用户购物车数据
export const getCartList = () => request.get('/cart/cartList')
// 删除购物车商品
export const deleteCart = (skuId) => request.delete(`/cart/deleteCart/${skuId}`)
// 切换购物车中商品选中状态
export const checkCart = (skuId, isChecked) => request.get(`/cart/checkCart/${skuId}/${isChecked}`)