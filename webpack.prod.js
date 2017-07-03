/**
 * Created by LzxHahaha on 2017/7/3.
 */
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const baseWebpackConfig = require('./webpack.base');
const htmlWebpackPluginConfig = require('./config/htmlWebpackPluginConfig');

module.exports = merge(baseWebpackConfig, {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/assets/'
  },

  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new HTMLWebpackPlugin(htmlWebpackPluginConfig),
    new CopyWebpackPlugin([
      { from: path.resolve(__dirname, 'assets'), to: path.resolve(__dirname, 'build/assets'), force: true }
    ])
  ]
});
