import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import autoPreprocess from 'svelte-preprocess';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import postcssPresetEnv from 'postcss-preset-env';
import css from 'rollup-plugin-css-only';
import injectProcessEnv from 'rollup-plugin-inject-process-env';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';

const production = process.env.ROLLUP_WATCH;

function getConfig(inputPath, outputPath, cssPath) {
  let config = {
    input: inputPath,
    output: {
      sourcemap: true,
      format: 'iife',
      name: 'app',
      file: outputPath
    },
    plugins: [
      svelte({
        compilerOptions: {
          // enable run-time checks when not in production
          dev: !production
        },
        preprocess: autoPreprocess({
          postcss: {
            plugins: [
              autoprefixer(),
              cssnano(),
              postcssPresetEnv({ stage: 2, browsers: 'last 5 versions, dead' })
            ]
          }
        })
      }),

      css({
        output: cssPath
      }),

      // If you have external dependencies installed from
      // npm, you'll most likely need these plugins. In
      // some cases you'll need additional configuration -
      // consult the documentation for details:
      // https://github.com/rollup/plugins/tree/master/packages/commonjs
      resolve({
        browser: true,
        dedupe: ['svelte']
      }),
      commonjs(),
      typescript({ sourceMap: !production }),

      // If we're building for production (npm run build
      // instead of npm run dev), minify
      production && terser(),

      // set process.env.NODE_ENV to production or development
      injectProcessEnv({
        NODE_ENV: !production ? 'production' : 'development'
      })
    ],
    watch: {
      clearScreen: false
    }
  };

  return config;
}

export default [
  getConfig(
    'src/ts/svelte/settings.ts',
    'build/js/svelte/settings.js',
    'css/settings.css'
  )
];
