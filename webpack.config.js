const path = require('path')
const Html = require('html-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

module.exports = [{
  target: 'web',
  mode: 'development',
  entry: { account: './src/account.tsx' },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: "[name].bundle.js"
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /\bnode_modules\b/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env'],
            ['@babel/preset-react'],
            ['@babel/preset-typescript'],
          ],
          plugins: [
            ['@babel/plugin-transform-runtime']
          ]
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', {
          loader: 'css-loader',
          options: {
            modules: true
          }
        }]
      }
    ]
  },
  plugins: [new Html({
    template: './src/account.html',
    filename: '../public/account.html'
  })],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  }
},
{
  target: 'node',
  mode: 'development',
  entry: { server: './server/index.ts' },
  output: { filename: "[name].bundle.js" },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /\bnode_modules\b/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-typescript'],
          ]
        }
      }
    ]
  }
}]