const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3000;

// Function to calculate GCD using Euclid's algorithm
function gcd(a, b) {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

// Create the server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  if (pathname === '/') {
    // Serve the HTML file
    const filePath = path.join(__dirname, 'public', 'index.html');
    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content);
    });
  } else if (pathname === '/style.css') {
    // Serve the CSS file
    const filePath = path.join(__dirname, 'public', 'style.css');
    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/css' });
      res.end(content);
    });
  } else if (pathname === '/script.js') {
    // Serve the JavaScript file
    const filePath = path.join(__dirname, 'public', 'script.js');
    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'application/javascript' });
      res.end(content);
    });
  } else if (pathname === '/gcd') {
    // Handle GCD computation
    const { num1, num2 } = parsedUrl.query;
    const a = parseInt(num1, 10);
    const b = parseInt(num2, 10);

    if (isNaN(a) || isNaN(b)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid inputs. Both inputs must be numbers.' }));
      return;
    }

    const result = gcd(a, b);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ gcd: result }));
  } else {
    // Handle 404
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
