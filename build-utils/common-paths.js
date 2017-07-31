const path = require('path')

module.exports = {
  appEntry: './src/index.js',
  outputPath: path.resolve(__dirname, '../dist'),
  root: path.resolve(__dirname, '../')
}