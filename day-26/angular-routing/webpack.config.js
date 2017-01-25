'use strict';

// step 1
const dotenv = require('dotenv');
const webpack = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// step 3
dotenv.load();

// step 2
const production = process.env.NODE_ENV === 'production';

// step 4
let plugins = [
  new ExtractTextPlugin('bundle.css'),
  new HTMLPlugin({
    template: `${__dirname}/app/index.html`
  }),
  new webpack.DefinePlugin({
    __API_URL__: JSON.stringify(process.env.API_URL),
    __DEBUG__: JSON.stringify(!production)
  })
];

// step 5
if(production) {
  plugins = plugins.concat([
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false
      }
    }),
    new CleanPlugin()
  ]);
}

// step 6
module.exports = {
  entry: `${__dirname}/app/entry.js`,
  devtool: production ? false : 'eval',
  plugins,
  output: {
    path: 'build',
    filename: 'bundle.js'
  },
  sassLoader: {
    includePaths: [`${__dirname}/app/scss`]
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.(woff|ttf|svg|eot).*/,
        loader: 'url?limit=10000&name=image/[hash].[ext]'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!resolve-url!sass?sourceMap')
      }
    ]
  }
};
