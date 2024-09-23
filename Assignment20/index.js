require('dotenv').config()

const express = require('express')
const connectToDb = require('./src/config/db')
const app = express()


const Pt = process.env.PORT || 3001

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.listen(Pt, async() => {
    try {
        await connectToDb(process.env.MONGO_URI)
        console.log(`Database got connected`);
        
    } catch (error) {
        console.log(`Database is not connected`);
        
    }
    console.log(`Server running at port ${Pt}`);
    
} )