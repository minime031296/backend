require('dotenv').config()
const express = require('express')
const connectToDB = require('./src/config/db')
const movieRoute = require('./src/routes/movies.route')
const app = express()
const Pt = process.env.PORT || 3001

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/movie', movieRoute)


app.listen(Pt, async() => {
    try {
        await connectToDB(process.env.MONGO_URI)
        console.log('connected to database');
    } 
    catch (error) {
        console.log("!connected to database");
    }
        console.log(`server running at port: ${Pt}`);
    })
