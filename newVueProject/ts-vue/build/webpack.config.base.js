const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const pkg = require('../package.json');

const cwd = process.cwd();

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  context: path.resolve(cwd, 'src'),
  module: {
    rules: [
      {
        test: /\.ts/,
        use: [{
          loader: 'ts-loader',
          options: {
            configFile: path.resolve(cwd, 'tsconfig.json'),
            appendTsSuffixTo: [/\.vue$/],
          },
        }],
        exclude: '/node_modules/',
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          postLoaders: {
            html: 'babel-loader?sourceMap',
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader',
          'postcss-loader',
        ],
      },
    ],
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.VERSION': `'${pkg.version}'`,
    }),
    new VueLoaderPlugin(),
  ],
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue',
    },
    'vue-property-decorator': {
      commonjs: 'vue-property-decorator',
      commonjs2: 'vue-property-decorator',
    },
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.ts'],
    alias: {
      vue: 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    },
  },
  mode: 'production',
};
