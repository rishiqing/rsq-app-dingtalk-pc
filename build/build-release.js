'use strict'
require('./check-versions')()

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'release'
}
console.log('----build----: env is: ' + process.env.NODE_ENV)

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.release.conf.js')

const spinner = ora('building for release...')
spinner.start()

rm(path.join(config.release.assetsRoot, config.release.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red(' release Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan(' release Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
