const http = require('http')
const fs = require('fs')
const path = require('path')


const filePath = path.join(__dirname, 'index.js')

const server = http.createServer((req,res)=>{
    if(req.url === '/') {
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/plain')
        res.write('Welcome to Home Page')
        res.end()
    }else if(req.url === '/aboutus') {
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html')
        res.write('<h3>Welcome to About Page</h3>')
        res.end()
    }else if(req.url === '/contactus') {
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html');
        res.write('<a href="https://www.masaischool.com/">contact us at www.masaischool.com</a>')
        res.end()
    }else if(req.url === '/index') {
        
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if(err) {
                res.statusCode = 500
                res.setHeader('Content-Type', 'text/plain')
                res.write('Something wrong in index route')
                res.end()
                
            }else{
                res.statusCode = 200
                res.setHeader('Content-Type', 'text/javascript');
                res.write(data)
                res.end()
            }
        })

    }else {
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/html')
        res.write('404 Not Found')
        res.end()
    }
    
})

server.listen(8080, () => {
    console.log('server running at 8080');
    
})