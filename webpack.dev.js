/**
 * Created by LzxHahaha on 2017/7/2.
 */

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const baseWebpackConfig = require('./webpack.base');
const htmlWebpackPluginConfig = require('./config/htmlWebpackPluginConfig');

baseWebpackConfig.entry.unshift('babel-polyfill');

const PORT = 9000;

module.exports = merge(baseWebpackConfig, {
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: `/assets/`
  },

  devtool: 'source-map',

  devServer: {
    hot: true,
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, 'build'),
    publicPath: '/assets/',
    inline: true,
    port: PORT,

    stats: {
      assets: true,
    },
  },

  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HTMLWebpackPlugin(htmlWebpackPluginConfig),
    new HtmlWebpackHarddiskPlugin(),
    new CopyWebpackPlugin([
      { from: path.resolve(__dirname, 'assets'), to: path.resolve(__dirname, 'build/assets'), force: true }
    ])
  ]
});
