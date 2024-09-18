require('dotenv').config()
const express = require('express')
const connectToDb = require('./src/config/db')
const ProductRoute = require('./src/routes/product.route')
const app = express()
const Pt = process.env.PORT || 3001

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//route of product
app.use('/product', ProductRoute)

//Server and databse connection
app.listen(Pt, async() => {
    try {
        connectToDb(process.env.MONGO_URI)
        console.log(`database connected`);
        
    } catch (error) {
        console.log(`!database connected`);
        
    }
    console.log(`server running at port ${Pt}`);
    
})