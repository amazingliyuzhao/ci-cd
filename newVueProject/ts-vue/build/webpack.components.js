const merge = require('webpack-merge');
// const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const glob = require('glob');
const webpack = require('webpack');

const baseConfig = require('./webpack.config.base');

const cwd = process.cwd();

const entry = glob.sync('src/components/**/*.ts').reduce((entries, p) => {
  const name = path.parse(p).dir.split('/').pop();
  // const name = path.basename(p, '.ts');
  return { ...entries, [name]: `../${p}` };
}, {});
module.exports = merge(baseConfig, {
  entry,
  output: {
    filename: '[name].js',
    path: path.resolve(cwd, 'lib'),
    publicPath: '/',
    libraryTarget: 'umd',
    library: '@fep/components',
    umdNamedDefine: true,
  },
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue',
    },
  },
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
  ],
  optimization: {
    minimize: false,
    concatenateModules: false,
    // minimizer: [
    //   new TerserPlugin({
    //     terserOptions: {
    //       compress: {
    //         keep_fnames: true
    //       },
    //       keep_fnames: true
    //     }
    //   }),
    // ]
  },
});
