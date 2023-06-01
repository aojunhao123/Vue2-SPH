// 该模块用于对外暴露数据接口

// 引入axios模块
import request from './request'
import mockRequest from './mockRequest'
// 对外暴露数据接口
export const getCategoryList = () => request.get('/product/getBaseCategoryList')
// 该请求方法至少传递一个空对象
export const getSearchInfo = (data) => request({ url: '/list', method: 'post', data: data })
export const getBannerList = () => mockRequest.get('/banners')
export const getFloorList = () => mockRequest.get('/floors')
export const getDetailList = (skuId)=>request.get(`/item/${skuId}`)