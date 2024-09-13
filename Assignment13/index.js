require('dotenv').config()
const express = require('express')
const connectToDb = require('./src/config/db')
const userRoute = require('./src/routes/user.route')
const productRoute = require('./src/routes/product.route')

const app = express()
const Port = process.env.PORT || 3030

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/user', userRoute)
app.use('/product', productRoute)


app.listen(Port, () => {
    try {
        connectToDb(process.env.MONGO_URI)
        console.log("Connected To Database");
        
    } catch (error) {
        console.log("!Connected To Database");
    }
    console.log(`Server running at Port: ${Port}`);
    
})