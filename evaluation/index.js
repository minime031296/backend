require('dotenv').config()
const express = require('express')
const connectToDb = require('./src/config/db')
const authRouter = require('./src/routes/auth.route')
const userRouter = require('./src/routes/user.route')
const authToken = require('./src/middlewares/authToken')
const authorRouter = require('./src/routes/author.routes')
const bookRouter = require('./src/routes/book.route')
const app = express()
const PORT = process.env.PORT || 3001


//express middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//routes
app.use('/api/auth', authRouter)
app.use('/api', authToken, userRouter)
app.use('/api', authToken, authorRouter)
app.use('/api', authToken, bookRouter)

//server+db
app.listen(PORT, async() => {
    try {
        await connectToDb(process.env.MONGO_URI)
        console.log(`Database connected successfully`);
        
    } catch (error) {
        console.log(`Database not connected successfully`);
    }
    console.log(`server running at http//localhost:${PORT}`)
})