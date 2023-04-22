// 该模块用于模拟数据接口

// 引入mock
import Mock from 'mockjs'
// 引入json文件
import banners from './banners'
import floors from './floors'

 /* 
 mock方法接收三个参数
    参数一:请求URL,
    参数二:请求方式(默认为get,可不写)
    参数三:请求数据
 */
// 模拟数据
Mock.mock('/mock/banners',{code:200,data:banners})
Mock.mock('/mock/floo s',{code:200,data:floors})