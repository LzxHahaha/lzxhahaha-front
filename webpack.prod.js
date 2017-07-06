/**
 * Created by LzxHahaha on 2017/7/3.
 */
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');

const baseWebpackConfig = require('./webpack.base');
const htmlWebpackPluginConfig = require('./config/htmlWebpackPluginConfig');

module.exports = merge(baseWebpackConfig, {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },

  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new HTMLWebpackPlugin(Object.assign({}, htmlWebpackPluginConfig, {
      lib: ['jquery', 'react', 'react-dom', 'react-router', 'react-router-dom', 'react-bootstrap', 'markdown', 'urijs']
    })),
    new HtmlWebpackIncludeAssetsPlugin({
      assets: [
        '//cdn.bootcss.com/jquery/2.2.4/jquery.min.js',
        '//cdn.bootcss.com/react/15.6.1/react.min.js',
        '//cdn.bootcss.com/react/15.6.1/react-dom.min.js',
        "//cdn.bootcss.com/react-router-dom/4.1.1/react-router-dom.min.js",
        '//cdn.bootcss.com/react-router/2.4.1/ReactRouter.min.js',
        '//cdn.bootcss.com/markdown.js/0.5.0/markdown.min.js',
        '/urijs-1.18.1.min.js',
      ],
      append: false
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    new CopyWebpackPlugin([
      { from: path.resolve(__dirname, 'assets'), to: path.resolve(__dirname, 'dist'), force: true }
    ])
  ],

  externals: {
    "jquery": "$",
    "react": "React",
    "react-dom": "ReactDOM",
    "react-router": "ReactRouter",
    "react-router-dom": "ReactRouterDOM",
    "react-bootstrap": "ReactBootstrap",
    "markdown": "markdown",
    "urijs": "URI"
  }
});
