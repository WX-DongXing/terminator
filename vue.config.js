const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const isProd = process.env.NODE_ENV === 'production'

// 开发环境CDN
const devCDN = {
  externals: {
    ace: 'ace'
  },
  js: [
    {
      url: 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.9/ace.js',
      sri: 'sha256-CvwZRDTGSAw2IQybkwEsxuHuo7SaVRIX+fofIG6G4Pk='
    },
    {
      url: 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.9/mode-json.min.js',
      sri: 'sha256-oMH6MIx8AGl0OseaL8vGcdSb9ons1Jprkf4xXAyzvNc='
    }
  ]
}

// 生产环境CDN
const prodCDN = {
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    echarts: 'echarts',
    moment: 'moment',
    '@antv/g6': 'G6',
    ace: 'ace'
  },
  prefetch: [
    'https://cdn.jsdelivr.net',
    'https://cdnjs.cloudflare.com',
    'https://gw.alipayobjects.com'
  ],
  css: [],
  js: [
    {
      url: 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js',
      sri: 'sha256-ngFW3UnAN0Tnm76mDuu7uUtYEcG3G5H1+zioJw3t+68='
    },
    {
      url: 'https://cdn.jsdelivr.net/npm/vue-router@3.1.6/dist/vue-router.min.js',
      sri: 'sha256-B8zvQ+y1lIQkcm+EJyCis+7AgsnzaTCBAHgkrPFQr9A='
    },
    {
      url: 'https://cdn.jsdelivr.net/npm/vuex@3.1.3/dist/vuex.min.js',
      sri: 'sha256-FRU9P9NftDIPZJdSnb3SaUNLNoymsH+ZjSyknLfCstk='
    },
    {
      url: 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.9/ace.js',
      sri: 'sha256-CvwZRDTGSAw2IQybkwEsxuHuo7SaVRIX+fofIG6G4Pk='
    },
    {
      url: 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.9/mode-json.min.js',
      sri: 'sha256-oMH6MIx8AGl0OseaL8vGcdSb9ons1Jprkf4xXAyzvNc='
    },
    {
      url: 'https://cdn.jsdelivr.net/npm/echarts@4.7.0/dist/echarts.common.min.js',
      sri: 'sha256-Rj1TfT5gkFCrv1OP/oygvH5ckhbv6sE5h5RVPLGMmRM='
    },
    {
      url: 'https://cdn.jsdelivr.net/npm/moment@2.24.0/moment.min.js'
    },
    {
      url: 'https://gw.alipayobjects.com/os/antv/pkg/_antv.g6-3.2.8/build/g6.js'
    }
  ]
}

module.exports = {
  configureWebpack: {
    externals: isProd ? prodCDN.externals : devCDN.externals,
    plugins: [
      new LodashModuleReplacementPlugin()
    ]
  },
  // 打包部署至github
  publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/',
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].cdn = isProd ? prodCDN : devCDN
      return args
    })
  }
}
