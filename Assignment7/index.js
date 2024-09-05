const express = require('express')
const {log} = require('console')

const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))

let defaultMiddleware = (req, res, next) => {
    let allowedRoutes = ['/', '/about', '/contact', '/random']
    if(!allowedRoutes.includes(req.url)) {
        return res.send("404-Page Not Found")
    }
    next()
}

app.use(defaultMiddleware)

app.get('/', (req, res) => {
    return res.send("<h1>Welcome to the Express.js Server</h1>")
}).get('/about', (req, res) => {
    return res.send("This is a simple webserver built using Express.js")
}).get('/contact', (req, res)=> {
    return res.json({"message": { 
        "email": "student@example.com",
        "phone": "123-456-7890"
        }    
    })
}).get('/random', (req, res) => {
    const randomData = Math.floor(Math.random() * 100);
    return res.send(randomData.toString())
})




app.listen(PORT, () => {
    log(`Server running at:`, PORT)
})