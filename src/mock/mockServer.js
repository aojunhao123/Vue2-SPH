// 该模块用于模拟数据接口

// 引入mock
import Mock from 'mockjs'
// 引入json文件
// webpack默认对外暴露图片、json文件(因此无需我们自己对外暴露)
import banners from './banners'
import floors from './floors'
import address from './address'

/* 
mock方法接收三个参数
   参数一:请求URL,
   参数二:请求方式(默认为get,可不写)
   参数三:请求数据
*/
// 模拟数据(创建模拟接口)
Mock.mock('/mock/banners', { code: 200, data: banners })
Mock.mock('/mock/floors', { code: 200, data: floors })
Mock.mock('/mock/address', { code: 200, data: address })