'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'beta'
console.log('----build----: env is: ' + process.env.NODE_ENV)

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.beta.conf')

const spinner = ora('building for beta...')
spinner.start()

rm(path.join(config.beta.assetsRoot, config.beta.assetsSubDirectory), err => {
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
      console.log(chalk.red(' beta Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan(' beta Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
