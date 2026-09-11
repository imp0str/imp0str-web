const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const root = __dirname;
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg' };

http.createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  const name = pathname === '/' ? 'index.html' : pathname.slice(1);
  const file = path.resolve(root, name);
  if (!file.startsWith(`${root}${path.sep}`) || !types[path.extname(file)]) {
    response.writeHead(404).end();
    return;
  }
  fs.readFile(file, (error, data) => {
    if (error) response.writeHead(404).end();
    else response.writeHead(200, { 'Content-Type': types[path.extname(file)], 'Cache-Control': 'no-store' }).end(data);
  });
}).listen(4175, '127.0.0.1', () => console.log('Web preview ready at http://127.0.0.1:4175'));
