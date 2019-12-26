module.exports = {
  publicPath: process.env.NODE_ENV === 'development' ? '/' : '/lshextension/',
  outputDir: 'dist',
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    host: 'loc.iris.com',
    port: 3030,
    open: true, 
    proxy: {
      '/cxb': {
        target: 'http://iris.com:9090',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/cxb': ''
        }
      }
    }
  },
  css: {
    extract: false,
    sourceMap: false, // 用于开发人员定位问题
    loaderOptions: {
      postcss: {
        // remUnit在这里要根据lib-flexible的规则来配制，如果您的设计稿是375px，用37.5就刚刚好
        plugins: [
          require('postcss-px2rem')({
            remUnit: 37.5
          })
        ]
      },
    },
    requireModuleExtension: true
  }
}