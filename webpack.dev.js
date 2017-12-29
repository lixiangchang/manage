const fs = require('fs')
const path = require('path')
const glob = require('glob')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

let webpackConfig = {
  entry: {
    app: ['./src/scripts/app.js'],
    vendor: ['fastclick']
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
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'static/images/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.ejs$/,
        use: [
          {
            loader: 'ejs-loader?variable=data'
          }
        ]
      }
    ]
  },
  plugins: webpackConfig.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([
      // {
      //   from: './src/images',
      //   to: 'static/images/'
      // },
      {
        from: './src/libs',
        to: 'static/scripts/'
      }
    ])
  ]),
  resolve: {
    extensions: ['.js', '.css', '.scss', '.ejs', '.html'],
    alias: {
      css: path.resolve(__dirname, './src/styles'),
      '@': path.resolve(__dirname, './src/components')
    }
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist/'),
    watchContentBase: true,
    openPage: 'order-list.html',
    port: 9000,
    inline: true,
    hot: true,
    open: true,
    proxy: {
      '/wap': {
        target: 'http://192.168.2.111:8081/fruit-wapadmin-web/wap',
        changeOrigin: true,
        pathRewrite: {
          '^/wap': ''
        }
      }
    }
    // host: '192.168.2.113'
  }
}
