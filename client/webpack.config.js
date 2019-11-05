const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');
const PwaManifestWebpackPlugin = require('pwa-manifest-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//   .BundleAnalyzerPlugin;

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: './src/index.js',
  target: 'web',
  output: {
    path: path.join(__dirname, '../public'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  performance: {
    hints: false
  },
  devServer: {
    port: 9000,
    contentBase: path.join(__dirname, 'src'),
    proxy: {
      '/socket.io/**': {
        target: 'ws://localhost:3000',
        ws: true
      }
    },
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /(\.scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      title: 'Battleship',
      filename: 'index.html',
      template: './src/index.html'
    }),
    new InjectManifest({
      swSrc: './src/sw.js',
      precacheManifestFilename: 'precache.[manifestHash].js'
    }),
    new PwaManifestWebpackPlugin({
      name: 'Battleship',
      short_name: 'Battleship',
      icon: {
        src: path.resolve('src/assets/icon.png'),
        sizes: [512, 384, 192, 152, 144, 128, 96, 72]
      },
      start_url: '/',
      theme_color: '#333',
      background_color: '#e4e4e4'
    })
    //new BundleAnalyzerPlugin()
  ]
};
