const fs = require('fs')
const path = require('path')
const glob = require('glob')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
let webpackConfig = {
  // 'swiper',
  entry: {
    app: ['./src/scripts/app.js'],
    vendor: ['fastclick', 'autosize']
  },
  plugins: [],
  getFiles() {
    var dirPath = './src/views/'
    var files = glob.sync(dirPath + '**/*.*')
    for (var i = 0; i < files.length; i++) {
      var file = files[i]
      var name = path.basename(file).replace(/\.(html|ejs)$/, '')
      this.plugins.push(
        new HtmlWebpackPlugin({
          filename: name + '.html',
          template: file,
          // chunks: ['vendor', 'app'],
          alwaysWriteToDisk: true
        })
      )
    }
  }
}

webpackConfig.getFiles()

module.exports = {
  entry: webpackConfig.entry,
  output: {
    filename: 'static/scripts/[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: [
          path.resolve(__dirname, 'node_modules'),
          path.resolve(__dirname, 'bower_components')
        ],
        loader: 'babel-loader'
      },
      {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            },
            'postcss-loader',
            'sass-loader'
          ]
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 20000,
              name: 'static/images/[name].[ext]'
            }
          }
          // {
          //   loader: 'image-webpack-loader'
          // }
        ]
      },
      {
        test: /\.html$/,
        use: [{ loader: 'html-loader' }]
      },
      {
        test: /\.ejs$/,
        use: [{ loader: 'ejs-loader?variable=data' }]
      }
    ]
  },
  plugins: webpackConfig.plugins.concat([
    new CleanWebpackPlugin(['dist']),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: 2
    }),
    new ExtractTextPlugin({
      filename: 'static/styles/style.css',
      allChunks: true
    }),
    new CopyWebpackPlugin([
      {
        from: './src/libs',
        to: 'static/scripts/'
      }
    ]),
    new webpack.optimize.UglifyJsPlugin({
      // mangle: {
      // except: ['$super', '$', 'exports', 'require', 'Fastclick']
      // },
      exclude: path.resolve(__dirname, 'node_modules')
    })
  ]),
  resolve: {
    extensions: ['.js', '.css', '.scss'],
    alias: {
      '@': path.resolve(__dirname, './src/components')
    }
  }
}
