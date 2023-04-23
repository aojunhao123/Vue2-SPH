const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {//匹配所有api开头的请求路径
        target: ' http://gmall-h5-api.atguigu.cn',
        changeOrigin: true
        /*
            changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
            changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:8080
            changeOrigin默认值为true
        */
      }
    }
  }
})
