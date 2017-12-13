'use strict'
const utils = require('./utils')
const config = require('../config')
const c = config[process.env.NODE_ENV]

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: c.productionSourceMap ? c.productionSourceMap : c.cssSourceMap,
    extract: c.cssLoader.extract
  }),
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
