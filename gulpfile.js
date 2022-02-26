// Import basic dependencies
const gulp = require("gulp");
const plumber = require("gulp-plumber");
const log = require("fancy-log");
const argv = require("yargs").argv;
const webpack = require("webpack-stream");

// HTML
const htmlmin = require("gulp-htmlmin");

// JavaScript
const babel = require("gulp-babel");
const minify = require("gulp-minify");

// Important variables
const src = "src";
const dist = "build";

function isProd() {
  return argv.production ? true : false;
}

console.log(isProd());

const views = () => {
  return gulp
    .src(`${src}/views/**/*.html`)
    .pipe(plumber())
    .pipe(
      htmlmin({
        collapseWhitespace: isProd(),
        removeComments: true,
        html5: true,
        removeEmptyAttributes: true,
        sortAttributes: true,
        sortClassName: true,
      })
    )
    .pipe(gulp.dest(`${dist}/views`));
};

const script = () => {
  return gulp
    .src(`${src}/js/**/*.js`)
    .pipe(
      plumber((error) => {
        log.info(error.message);
      })
    )
    .pipe(
      webpack({
        mode: isProd() ? "production" : "development",
        output: { filename: "bundle.js" },
      })
    )
    .pipe(babel())
    .pipe(minify())
    .pipe(gulp.dest(`${dist}/js`));
};

const watch = () => {
  gulp.watch(
    [`${src}/views/**/*.html`, `${src}/js/**/*.js`],
    gulp.series(views, script)
  );
};

const dev = gulp.series(views, script, watch);
const build = gulp.series(views, script);

exports.dev = dev;
exports.build = build;
exports.default = build;
