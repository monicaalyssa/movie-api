// variable declaration
const http = require('http'),
url = require('url'),
fs = require('fs');

// createserver callback func to parse the requested documentation url
/* 
http.createServer((request, response) => {
let addr = request.url
q = new URL(addr, 'http://' + request.headers.host), // url is set to the q variable
filePath = '';

// appendfile used to log recent requests to log.txt
fs.appendFile('log.txt', 'URL: ' + addr + '\nTimestamp: ' + new Date() + '\n\n', (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log('Added to log.');
  }
});

// if-else statement to check if the file path includes documentation
if (q.pathname.includes('documentation')) {
  filePath = (__dirname + '/documentation.html');
} else { // if file path doesn't include documentation send user to home page
    filePath = 'index.html';
  }

// readfile callback to grab the appropriate file from server
  fs.readFile(filePath, (err, data) => {
if (err) {
  throw err;
}
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(data)
  response.end('Hello Node!\n');

  });

// listens for requests on port 8080 from http module import
}).listen(8080);
console.log('My first Node test server is running on Port 8080.');
*/