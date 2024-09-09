const express = require("express")
const {log} = require('console')
const userRoutes = require("./src/Routes/route.user");
const todoRoutes = require("./src/Routes/route.todos");
const app = express()


app.use(express.json());
const PORT = 3000

app.use('/api/users', userRoutes)
app.use('/api/todos', todoRoutes)


app.listen(PORT, () => {
    log(`Server Running at Port: ${PORT}`)
})