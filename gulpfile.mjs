// Import basic dependencies
import babel from 'gulp-babel';
import { fileURLToPath } from 'url';
import gulp from 'gulp';
import log from 'fancy-log';
import path from 'path';
import plumber from 'gulp-plumber';
import webpack from 'webpack-stream';
import yargs from 'yargs';

// Important variables
const src = 'src';
const dist = 'build';
const dirname = path.dirname(fileURLToPath(import.meta.url));

// eslint-disable-next-line no-undef
const argv = yargs(process.argv.slice(2)).argv;

const isProd = function () {
  return Boolean(argv.production);
};

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
      webpack({
        mode: isProd() ? 'production' : 'development',
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
        }
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
      `${src}/.htaccess`
    ],
    gulp.series(htaccess, script)
  );
};

const dev = gulp.series(htaccess, script, watch);
const build = gulp.series(htaccess, script);

export { dev, build };
