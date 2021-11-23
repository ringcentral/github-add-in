const { HotModuleReplacementPlugin, LoaderOptionsPlugin } = require('webpack')
require('dotenv').config()
const { identity } = require('lodash')
const { resolve } = require('path')
const { env } = process
const devPort = env.devPort || 6066
const host = env.host || 'localhost'
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const extractTextPlugin1 = new MiniCssExtractPlugin({
  filename: 'css/[name].styles.bundle.css'
})
const stylusSettingPlugin = new LoaderOptionsPlugin({
  test: /\.styl$/,
  stylus: {
    preferPathResolver: 'webpack'
  },
  'resolve url': false
})

const isProd = env.NODE_ENV === 'production'

const config = {
  mode: 'development',
  entry: {
    app: './src/client/app.js',
    token: './src/client/token.js',
    bot: './src/client/bot.js'
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.json']
  },
  output: {
    path: resolve(__dirname, '../deploy/dist/static'),
    filename: 'js/[name].bundle.js',
    publicPath: '/',
    chunkFilename: 'js/[name].bundle.js',
    libraryTarget: 'var'
  },
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              // publicPath: '../'
            }
          },
          'css-loader',
          'stylus-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: '../'
            }
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
              // modifyVars: theme
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|svg|mp3)$/,
        use: ['url-loader?limit=100000&name=images/[name].[ext]']
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader?cacheDirectory'
      }
    ]
  },
  devtool: 'source-map',
  optimization: {
    minimize: true,
    minimizer: [
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  devServer: {
    host,
    disableHostCheck: true,
    contentBase: '../deploy/dist/static',
    port: devPort,
    overlay: {
      warnings: true,
      errors: true
    },
    hot: true,
    proxy: {
      '/': {
        target: `http://${env.RINGCENTRAL_HOST}:${env.RINGCENTRAL_PORT}`,
        bypass: function (req, res, proxyOptions) {
          if (req.path.includes('.bundle.')) {
            return req.path
          }
        }
      }
    }
  },
  plugins: [
    extractTextPlugin1,
    new HotModuleReplacementPlugin()
  ].filter(identity)
}

if (isProd) {
  config.optimization = {
    minimize: true
  }
  config.mode = 'production'
  delete config.watch
  delete config.devtool
  delete config.devServer
  config.plugins = [
    extractTextPlugin1,
    new LodashModuleReplacementPlugin({
      collections: true,
      paths: true
    }),
    stylusSettingPlugin
  ]
}

module.exports = config
