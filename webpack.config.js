// extract CSS into it's own bundle
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// css minifier
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// js minifier
const TerserPlugin = require('terser-webpack-plugin');
// html minifier
const HtmlWebpackPlugin = require('html-webpack-plugin');
// clean dist folder on every build
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// copy assets like png/jpg/svg
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const PATHS = {
  src: path.resolve(__dirname, 'src/main.js'),
  dist: path.resolve(__dirname, 'dist')
};

module.exports = {
  entry: PATHS.src,
  mode: 'production',
  output: {
    path: PATHS.dist,
    filename: '[name].[contenthash:8].js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: './src/assets', to: 'assets' },
        { from: './src/manifest.json', to: './manifest.json' }
      ]
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false
      }),
      new OptimizeCssAssetsPlugin()
    ]
  },
  devServer: {
    host: '0.0.0.0',
    port: 3000
  }
};
