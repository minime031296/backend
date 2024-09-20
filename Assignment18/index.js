const connectToDb = require('./src/config/db')

require('dotenv').config()
const express = require('express')
const userRoute = require('./src/route/user.route')

const app = express()

//middlewares
app.use(express.json()) //for parsing the data
app.use(express.urlencoded({extended: false}))


//route declaration

app.use('/api', userRoute)



const Pt = process.env.PORT || 3001

app.listen(Pt, async() => {
    try {
        await connectToDb(process.env.MONGO_URI)
        console.log(`Database connected`);
        
    } catch (error) {
        console.log(`Database not connected`);
        
    }
    console.log(`server running at port ${Pt}`);
    
})