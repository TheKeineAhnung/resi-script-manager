// Import basic dependencies
import babel from 'gulp-babel';
import { fileURLToPath } from 'url';
import gulp from 'gulp';
import log from 'fancy-log';
import path from 'path';
import plumber from 'gulp-plumber';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import yargs from 'yargs';

// Important variables
const src = 'src';
const dist = 'build';
const dirname = path.dirname(fileURLToPath(import.meta.url));

// eslint-disable-next-line no-undef
const argv = yargs(process.argv.slice(2)).argv;

const getMode = function () {
  return argv.mode;
};

console.log(getMode());

const assets = () =>
  gulp
    .src(`${src}/assets/**/*.*`)
    .pipe(plumber())
    .pipe(gulp.dest(`${dist}/assets`))
    .pipe(gulp.dest(`${dist}/js/svelte/assets`));

const htaccess = () =>
  gulp
    .src(`${src}/.htaccess`)
    .pipe(plumber())
    .pipe(gulp.dest(`${dist}`));

const script = () =>
  gulp
    .src([
      `${src}/ts/**/*.ts`,
      `!${src}/ts/svelte/**/*.*`,
      `${src}/scripts/**/*.ts`
    ])
    .pipe(
      plumber(error => {
        log.info(error.message);
      })
    )
    .pipe(
      webpackStream({
        mode: getMode() === 'production' ? 'production' : 'development',
        output: {
          filename: 'bundle.js',
          path: path.resolve(dirname, `${dist}/js`)
        },
        resolve: {
          extensions: ['.ts', '.js']
        },
        module: {
          rules: [
            {
              test: /\.ts?$/u,
              loader: 'ts-loader',
              exclude: '/node_modules/'
            }
          ]
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
        ]
      })
    )
    .pipe(babel())
    .pipe(gulp.dest(`${dist}/js`));

const watch = () => {
  gulp.watch(
    [
      `${src}/ts/**/*.ts`,
      `${src}/scripts/**/*.ts`,
      `${src}/data/**/*.ts`,
      `${src}/.htaccess`,
      `${src}/assets/**/*`
    ],
    gulp.series(assets, htaccess, script)
  );
};

const dev = gulp.series(assets, htaccess, script, watch);
const build = gulp.series(assets, htaccess, script);

export { dev, build };
