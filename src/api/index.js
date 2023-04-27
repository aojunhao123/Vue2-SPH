// 该模块用于对外暴露数据接口

// 引入axios模块
import request from './request'
import mockRequest from './mockRequest'
// 对外暴露数据接口
export const getCategoryList = () => request.get('/product/getBaseCategoryList')
export const getBannerList = () => mockRequest.get('/banners')
export const getFloorList = ()=>mockRequest.get('/floors')