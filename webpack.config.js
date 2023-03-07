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
  return argv.mode;
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
  plugins: [
    new webpack.DefinePlugin({
      'process.env.MODE':
        getMode() === 'production'
          ? JSON.stringify('production')
          : getMode() === 'beta'
          ? JSON.stringify('beta')
          : JSON.stringify('development')
    })
  ],
  module: {
    rules: [
      {
        test: /\.ts$/u,
        use: 'ts-loader',
        // TODO: Exclude svelte stuff
        exclude: ['/node_modules/']
      }
    ]
  },
  mode: 'production'
};

export default Object.assign({}, config);
