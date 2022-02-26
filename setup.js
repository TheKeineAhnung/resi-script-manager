var fs = require("fs");
var log = require("fancy-log");

// create build directory
if (!fs.existsSync("build")) {
  fs.mkdirSync("build");
  log("Created build directory");
} else {
  log("build directory already exists");
}

// create theme directory
if (!fs.existsSync("build/theme")) {
  fs.mkdirSync("build/theme");
  log("Created build/theme directory");
} else {
  log("build/theme directory already exists");
}
