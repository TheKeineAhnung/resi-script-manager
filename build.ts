import { spawn, spawnSync, execSync } from 'child_process';
import { existsSync, mkdirSync } from 'fs';
import { info } from 'fancy-log';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const isWin = process.platform === 'win32';

// //! Important to use, because only `npm` & `npx` doesn't work on windows sometimes
// const npm = isWin ? 'npm.cmd' : 'npm';
const npx = isWin ? 'npx.cmd' : 'npx';

// const argv = yargs(hideBin(process.argv))
//   .options({
//     mode: { type: 'string' },
//     cmd: { type: 'string' }
//   })
//   .parseSync();

// const getMode = function () {
//   return argv.mode ?? 'production';
// };

// const getCmd = function () {
//   return argv.cmd ?? 'build';
// };

// interface Command {
//   command: string;
//   args: string[];
// }

// const onetimeCommands: Command[] = [
//   {
//     command: npm,
//     args: [`run`, `theme`]
//   }
// ];

// let longtimeCommands: Command[] = [
//   {
//     command: npx,
//     args: ['gulp', getCmd(), `--mode='${getMode()}'`]
//   },
//   {
//     command: npx,
//     args: [
//       `rollup`,
//       `-c`,
//       `rollup.config.js`,
//       getCmd() === 'dev' ? '-w' : '',
//       `--mode='${getMode()}'`
//     ]
//   }
// ];

const out = spawn(npx, [
  'rollup',
  '-c',
  'rollup.config.js',
  '--mode',
  '"development"'
]);

out.stdout.on('data', output => {
  console.log(output.toString());
});

out.on('error', e => {
  console.log(e);
});

out.stdout.on('error', e => {
  console.log(e);
});

// // Set up directories if they don't exist
// if (!existsSync('build')) {
//   mkdirSync('build');
//   info('Created build directory');
// }

// if (!existsSync('build/theme')) {
//   mkdirSync('build/theme');
//   info('Created build/theme directory');
// }

// onetimeCommands.forEach(command => {
//   info('Starting command');
//   const stdout = spawnSync(command.command, command.args);
//   console.log(stdout.output.toString());
// });

// // longtimeCommands.forEach(command => {
// //   const stdout = spawn(command.command, command.args);
// //   stdout.stdout.on('data', output => {
// //     console.log(output.toString());
// //   });
// // });

// for (const command of longtimeCommands) {
//   const stdout = spawn(command.command, command.args);
// }
