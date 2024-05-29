const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const zlib = require('zlib');

const PORT = 3000;

const server = http.createServer((req, res) => {
  const url = req.url;

  if (url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Node.js server of Poliniaiev Vladyslav</h1>');
  } else if (url === '/about') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>About us</h1><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel velit auctor, elementum nisi a, venenatis libero.</p>');
  } else if (url === '/getdata') {
    const data = {
      date: new Date().toISOString(),
      user: os.userInfo().username,
    };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  } else if (url === '/myfile') {
    const filePath = path.join(__dirname, 'data', 'file1.txt');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>Page not found</h1>');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(data);
      }
    });
  } else if (url === '/mydownload') {
    const filePath = path.join(__dirname, 'data', 'file2.txt');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>Page not found</h1>');
      } else {
        res.writeHead(200, {
          'Content-Type': 'text/plain',
          'Content-Disposition': 'attachment; filename="file2.txt"',
        });
        res.end(data);
      }
    });
  } else if (url === '/myarchive') {
    const filePath = path.join(__dirname, 'data', 'file1.txt.gz');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>Page not found</h1>');
      } else {
        res.writeHead(200, {
          'Content-Type': 'application/gzip',
          'Content-Disposition': 'attachment; filename="file1.txt.gz"',
        });
        res.end(data);
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>Page not found</h1>');
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
