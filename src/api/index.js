// 该模块用于对外暴露数据接口
import request from './request'
import mockRequest from './mockRequest'
export const getCategoryList = () => request.get('/product/getBaseCategoryList')
export const getBannerList = () => mockRequest.get('/banners')