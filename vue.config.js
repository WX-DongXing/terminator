module.exports = {
  configureWebpack: {
    // 配置CDN
    externals: {
      ace: 'ace'
    }
  },
  // 打包部署
  publicPath: process.env.NODE_ENV === 'production'
    ? '/terminator/'
    : '/'
}
