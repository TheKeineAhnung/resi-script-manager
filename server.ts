import { createServer } from 'http';
import { readFile } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

createServer((req, res) => {
  console.log(req.url);
  readFile(__dirname + '/build' + req.url, (err, data) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader(
    //   'Access-Control-Allow-Origin',
    //   ''
    // );
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
}).listen(8080);

console.log('Started server');
