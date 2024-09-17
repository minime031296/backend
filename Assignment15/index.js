require('dotenv').config()
const express = require('express')
const connectToDb = require('./src/config/db')
const productRoute = require('./src/routes/product.route')
const categoryRoute = require('./src/routes/category.route')
const app = express()
const Pt = process.env.PORT || 3030

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/product', productRoute)
app.use('/category', categoryRoute)

app.listen(Pt, async () => {
    try {
        await connectToDb(process.env.MONGO_URI)
        console.log(`Database is connected`)
    } catch (error) {
        console.log(`DataBase is not connected`)
    }
    console.log(`server running at port: ${Pt}`)
})