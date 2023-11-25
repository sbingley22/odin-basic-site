const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        serveFile('index.html', 'text/html', res);
    } else if (req.url === '/about') {
        serveFile('about.html', 'text/html', res);
    } else if (req.url === '/contact-me') {
        serveFile('contact-me.html', 'text/html', res);
    } else if (req.url === '/style.css') {
        serveFile('style.css', 'text/css', res);
    } else {
        serveFile('404.html', 'text/html', res);
    }
});

function serveFile(filename, contentType, res) {
    const filePath = path.join(__dirname, filename);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        } else {
            res.writeHead(200, { 'Content-type': contentType });
            res.end(data);
        }
    });
}

const port = 8000;

server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}/`);
});
