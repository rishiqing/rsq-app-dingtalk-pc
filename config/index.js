
'use strict'
// Template version: 1.1.3
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
const ip = require('ip')

var devPort = 8090

//  为了防止jenkins构建错误，需要在这里做处理
var devIp
try {
  devIp = ip.address('WLAN', 'ipv4')
} catch(e){
  devIp = ip.address()
}

module.exports = {
  release: {
    env: require('./release.env'),
    // /build/utils.js和vue-loader中使用
    cssLoader: {
      minimize: true,
      extract: true
    },
    productionSourceMap: true,
    index: path.resolve(__dirname, '../dist/workbei-pc/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist/workbei-pc/'),
    assetsSubDirectory: './',
    assetsPublicPath: '/dingtalk/workbei-pc/',
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report,
    // 日事清api的后台地址
    apiServer: 'https://www.workbei.com/',
    // apiServer: 'http://dd.rsq.etoutiao.cn/',
    // 日事清-portlet的权限认证后台地址
    authServer: 'https://www.workbei.com/backauth/',
    // authServer: 'http://dd.rsq.etoutiao.cn/rsqauth/',
    // 日事清前端文件地址
    frontServer: 'https://rishiqing-front.oss-cn-beijing.aliyuncs.com/dingtalk/workbei-pc/',
    // 阿里云OSS STS认证的server地址，临时！！！！注意更新
    stsServer: 'https://stsserver.hz.taeapp.com/sts/',
    // stsServer: 'http://182.92.222.40:8300/sts/',
    // 钉钉提醒服务器，用于发送钉钉内的通知提醒
    remindServer: 'https://pcding.rishiqing.com/',
    // PC端登录后，自动打开网页时的跳转root链接
    autoOpenServer: 'https://www.workbei.com/',
    aliOSS: {
      region: 'oss-cn-beijing',
      bucket: 'rishiqing-file',
      root: 'dingtalk/'
    },
    version: 2000000
  },
  beta: {
    env: require('./beta.env'),
    // /build/utils.js和vue-loader中使用
    cssLoader: {
      minimize: true,
      extract: true
    },
    productionSourceMap: true,
    index: path.resolve(__dirname, '../dist/beta/pc/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist/beta/pc/'),
    assetsSubDirectory: './',
    assetsPublicPath: '/dingtalk/beta/pc/',
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report,
    // 日事清api的后台地址
    apiServer: 'http://beta.dd.rsq.etoutiao.cn/',
    // apiServer: 'http://dd.rsq.etoutiao.cn/',
    // 日事清-portlet的权限认证后台地址
    authServer: 'http://beta.dd.rsq.etoutiao.cn/main/',
    // authServer: 'http://dd.rsq.etoutiao.cn/rsqauth/',
    // 日事清前端文件地址
    frontServer: 'https://rishiqing-front.oss-cn-beijing.aliyuncs.com/',
    // 阿里云OSS STS认证的server地址，临时！！！！注意更新
    stsServer: 'http://182.92.222.40:8300/sts/',
    // stsServer: 'http://182.92.222.40:8300/sts/',
    // 钉钉提醒服务器，用于发送钉钉内的通知提醒
    remindServer: 'http://beta.dd.rsq.etoutiao.cn/remind/',
    // PC端登录后，自动打开网页时的跳转root链接
    autoOpenServer: 'http://beta.rishiqing.com/',
    aliOSS: {
      region: 'oss-cn-beijing',
      bucket: 'rishiqing-file',
      root: 'dingtalk/'
    },
    version: 2000000
  },
  dev: {
    env: require('./dev.env'),
    // /build/utils.js和vue-loader中使用
    cssLoader: {
      minimize: false,
      extract: false
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false,
    port: process.env.PORT || devPort,
    autoOpenBrowser: false,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    hotPath: '/__webpack_hmr',
    apiServer: 'http://dd.rsq.etoutiao.cn/',
    // 日事清-portlet的权限认证后台地址
    authServer: 'http://dd.rsq.etoutiao.cn/main/',
    // 日事清前端文件地址
    frontServer: 'http://' + devIp + ':' + (process.env.PORT || devPort) + '/',
    stsServer: 'http://182.92.222.40:8300/sts/',
    // 钉钉提醒服务器，用于发送钉钉内的通知提醒
    remindServer: 'http://dd.rsq.etoutiao.cn/remind/',
    // PC端登录后，自动打开网页时的跳转root链接
    autoOpenServer: 'http://beta.rishiqing.com/',
    aliOSS: {
      region: 'oss-cn-beijing',
      bucket: 'rishiqing-file',
      root: 'dingtalk/'
    },
    version: 2000000
  }
}
