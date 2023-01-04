import { spawnSync } from 'child_process';
import { existsSync, mkdirSync, readFile } from 'fs';
import { info } from 'fancy-log';
import { createServer } from 'http';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const __dirname = dirname(fileURLToPath(import.meta.url));
const isWin = process.platform === 'win32';

//! Important to use, because only `npm` & `npx` doesn't work on windows sometimes
const npm = isWin ? 'npm.cmd' : 'npm';

const argv = yargs(hideBin(process.argv))
  .options({
    cmd: { type: 'string' }
  })
  .parseSync();

const getCmd = function () {
  return argv.cmd ?? 'build';
};

interface Command {
  command: string;
  args: string[];
}

const onetimeCommands: Command[] = [
  {
    command: npm,
    args: [`run`, `theme`]
  }
];

// Set up directories if they don't exist
if (!existsSync('build')) {
  mkdirSync('build');
  info('Created build directory');
}

if (!existsSync('build/theme')) {
  mkdirSync('build/theme');
  info('Created build/theme directory');
}

onetimeCommands.forEach(command => {
  info('Starting command');
  const stdout = spawnSync(command.command, command.args);
  console.log(stdout.output.toString());
});

if (getCmd() === 'dev') {
  createServer((req, res) => {
    info(req.url);
    readFile(__dirname + '/build' + req.url, (err, data) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      res.writeHead(200);
      res.end(data);
    });
  }).listen(8080);

  info('Started server');
}
