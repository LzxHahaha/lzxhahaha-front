/**
 * Created by LzxHahaha on 2017/7/2.
 */

const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    'whatwg-fetch',
    path.resolve(__dirname, 'src')
  ],

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        exclude: [
          /node_modules/
        ],
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'react', 'stage-3'],
          plugins: [
            "transform-class-properties",
            "transform-object-rest-spread"
          ]
        }
      },

      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]--[hash:base64:5]',
          'postcss-loader'
        ]
      },

      {
        test: /\.(png|jpe?g)$/,
        use: ['url-loader']
      }
    ]
  },

  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src')
    ],
    extensions: ['.js', '.jsx', '.json', '.css'],
    alias: {
      '@': 'src'
    }
  },

  context: __dirname,

  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
      NavBar: __dirname + '/src/components/NavBar'
    })
  ]
};
