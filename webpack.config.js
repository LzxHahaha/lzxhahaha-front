/**
 * Created by LzxHahaha on 2016/5/31.
 */

var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    'whatwg-fetch',
    './index.js'
  ],
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css']
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
      NavBar: __dirname + '/src/components/NavBar'
    })
  ],
  module: {
    loaders: [{
      test: /\.js|jsx$/,
      loaders: ['babel'],
      exclude: /node_modules/,
      loader: "babel",
      query: {
        presets: ['es2015', 'react', 'stage-3'],
        plugins: [
          "transform-class-properties",
          "transform-object-rest-spread"
        ]
      }
    }, {
      test: /\.css$/,
      loaders: [
        'style-loader',
        'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]--[hash:base64:5]',
        'postcss-loader'
      ]
    }, {
      test: /\.json$/,
      loader: 'json'
    }]
  },
  devServer: {
    historyApiFallback: true
  },
  externals: {
    "jquery": "$",
    "react": "React",
    "react-dom": "ReactDOM",
    "react-router": "ReactRouter",
    "react-bootstrap": "ReactBootstrap",
    "markdown": "markdown",
    "urijs": "URI"
  }
};