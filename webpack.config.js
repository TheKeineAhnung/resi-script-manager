import CopyWebpackPlugin from 'copy-webpack-plugin';
import path from 'path';
import { fileURLToPath } from 'url';
import webpack from 'webpack';
import yargs from 'yargs';

const src = 'src';
const dist = 'build';
const dirname = path.dirname(fileURLToPath(import.meta.url));

// eslint-disable-next-line no-undef
const argv = yargs(process.argv.slice(2)).argv;

const getMode = () => {
  return argv.buildMode;
};

const config = {
  devtool: getMode() === 'production' ? 'none' : 'eval-source-map',
  entry: { init: `./${src}/ts/init.ts` },
  output: {
    filename: '[name].js',
    path: path.resolve(dirname, `${dist}/js`)
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  target: 'web',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.MODE':
        getMode() === 'production'
          ? JSON.stringify('production')
          : getMode() === 'beta'
          ? JSON.stringify('beta')
          : JSON.stringify('development')
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${src}/assets`,
          to: `../assets`
        },
        { from: `${src}/.htaccess`, to: '../' }
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.ts$/u,
        use: 'ts-loader',
        exclude: ['/node_modules/', `/${src}/ts/svelte/`],
        rules: [
          {
            test: /\.svelte.ts$/u,
            loader: 'ignore-loader',
            exclude: ['/node_modules/']
          }
        ]
      }
    ]
  },
  mode: getMode() === 'production' ? 'production' : 'development'
};

export default Object.assign({}, config);
