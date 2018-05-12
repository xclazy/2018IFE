const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: '/node_modules/'
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.san$/,
        loader: 'san-loader'
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js'],
    alias: {
      san: process.env.NODE_ENV === 'production'
        ? 'san/dist/san.js'
        : 'san/dist/san.dev.js'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'mvvm'
    }),
  ]
};