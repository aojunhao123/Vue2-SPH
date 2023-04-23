// 该模块用于对外暴露数据接口
import request from './request'

export const getCategoryList = () => request.get('/product/getBaseCategoryList')