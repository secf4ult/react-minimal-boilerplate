const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const InterpolateHtmlPlugin = require('interpolate-html-plugin')

module.exports = {
  entry: {
    main: path.join(__dirname, 'src/index.js')
  },
  output: {
    filename: '[name].[contenthash:8].js',
    path: path.join(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /.css$/,
        use: [{
          loader: 'style-loader'
        },
        {
          loader: 'css-loader'
        }]
      }
    ]
  },
  resolve: {
    extensions: ['.jsx', '.js']
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 8080,
    overlay: true
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      scriptLoading: 'defer',
      favicon: './public/favicon.ico'
    }),
    new InterpolateHtmlPlugin({
      PUBLIC_URL: '/'
    })
  ]
}
