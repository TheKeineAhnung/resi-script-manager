const fs = require('fs');
const log = require('fancy-log');

// Create build directory
if (!fs.existsSync('build')) {
  fs.mkdirSync('build');
  log('Created build directory');
} else {
  log('build directory already exists');
}

// Create theme directory
if (!fs.existsSync('build/theme')) {
  fs.mkdirSync('build/theme');
  log('Created build/theme directory');
} else {
  log('build/theme directory already exists');
}
