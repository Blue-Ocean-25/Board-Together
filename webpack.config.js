const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: path.join(__dirname,'client/src/index.jsx'),
  output: {
    path: path.join(__dirname, 'client/dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use:{
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        }
      }},{
      test: /\.css$/i,
      include: path.resolve(__dirname, 'client/src'),
        use: ['style-loader', 'css-loader', 'postcss-loader'],
    }]
  },
  plugins: [new HtmlWebpackPlugin({ template: path.join(__dirname, './public/index.html')}),
    new Dotenv({
      path: path.resolve(__dirname, '.env'),
      safe: true,
      systemvars: true
    })
  ],
}