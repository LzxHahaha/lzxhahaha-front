/**
 * Created by LzxHahaha on 2016/5/31.
 */

var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: false,
  entry: [
    'whatwg-fetch',
    path.resolve(__dirname, './index.js')
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.ProvidePlugin({
      React: 'react',
      NavBar: __dirname + '/src/components/NavBar'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
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
    }, {
      test: /\.(png|jpe?g)$/,
      loaders: [
        'url-loader'
      ]
    }]
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
