const {Router}  = require('express')
const { CreateUser, GetUser, UpdateUser, DeleteUser } = require('../controller/userController')
const customValidator = require('../middleware/validator')


const userRoute = Router()

userRoute.post('/create-user', customValidator,CreateUser)
userRoute.get('/get-user', GetUser )
userRoute.patch('/update-user/:id', customValidator,UpdateUser)
userRoute.delete('/delete-user/:id',DeleteUser)

module.exports = userRoute