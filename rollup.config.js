import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import autoPreprocess from 'svelte-preprocess';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import postcssPresetEnv from 'postcss-preset-env';
import css from 'rollup-plugin-css-only';
import injectProcessEnv from 'rollup-plugin-inject-process-env';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import yargs from 'yargs';

// eslint-disable-next-line no-undef
const argv = yargs(process.argv.slice(2)).argv;

const getMode = function () {
  return argv.mode;
};

function getConfig(inputPath, outputPath, cssPath) {
  let config = {
    input: inputPath,
    output: {
      sourcemap: getMode() === 'production' ? false : true,
      format: 'iife',
      name: 'app',
      file: outputPath
    },
    plugins: [
      nodeResolve(),
      svelte({
        onwarn: (warning, handler) => {
          const { code } = warning;
          const ignoreCodes = ['css-unused-selector'];
          if (ignoreCodes.includes(code)) return;

          handler(warning);
        },
        compilerOptions: {
          dev: getMode() === 'production' ? false : true
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
      typescript({
        sourceMap: getMode() === 'production' ? false : true,
        tsconfig: './tsconfig.rollup.json'
      }),
      commonjs(),
      // set process.env.NODE_ENV to production or development
      injectProcessEnv({
        NODE_ENV: getMode() === 'production' ? 'production' : 'development',
        MODE:
          getMode() === 'production'
            ? 'production'
            : getMode() === 'beta'
            ? 'beta'
            : 'development'
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
