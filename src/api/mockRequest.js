// 该模块用于二次封装axios

// 引入nprogress
import nProgress from "nprogress";
import 'nprogress/nprogress.css'
import axios from "axios";
// 创建axios实例
const request = axios.create({
    // 前置url
    baseURL: '/mock',
    // 请求超时
    timeout: 5000,
})
// 请求拦截器
request.interceptors.request.use(config => {
    // 发送请求之前做点啥
    // 进度条开始
    nProgress.start()
    return config
})
// 响应拦截器
request.interceptors.response.use(response => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    // 进度条结束
    nProgress.done()
    return response.data;
}, err => {
    // 响应失败,处理错误结果
    return Promise.reject(err)
})
// 暴露axios实例
export default request