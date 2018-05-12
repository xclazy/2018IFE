const merge = require('webpack-merge');
const common = require('./webpack.base.js');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  }
});