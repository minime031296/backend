const http = require('http');
const fs = require('fs');
const path = require('path');
const { log } = require('console');

// File paths
const userFilePath = path.join(__dirname, 'user.txt');
const indexFilePath = path.join(__dirname, 'index.html');

const server = http.createServer((req, res) => {
    if (req.url === '/signup' && req.method === 'POST') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString(); 
        });

        req.on('end', () => {
            const { username, password } = JSON.parse(body);

         
            fs.appendFile(userFilePath, `${username}:${password}\n`, err => {
                if (err) {
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'text/plain');
                    res.end('Error saving user data');
                    return;
                }

                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Thank you for signing up');
            });
        });

    } else if (req.url === '/allusers' && req.method === 'GET') {
        fs.readFile(userFilePath, 'utf-8', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Error reading user data');
                return;
            }

            const users = data.split('\n').map(line => {
                const [username] = line.split(':');
                return username ? username : null;
            }).filter(Boolean);

            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(`<h1>All Users</h1><ul>${users.map(user => `<li>${user}</li>`).join('')}</ul>`);
        });

    } else if (req.url === '/') {
        fs.readFile(indexFilePath, 'utf-8', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Error loading the homepage');
                return;
            }

            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(data);
        });
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end('404 Not Found');
    }
});

server.listen(8080, () => {
    log('Server is running at http://localhost:8080');
});
