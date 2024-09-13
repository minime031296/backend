const {Router} = require('express')
const { CreateUser, GetUser, UpdateUser, SmallUpdateUser, DeleteUser } = require('../controller/user.controller')

const userRoute = Router()

userRoute.post('/create', CreateUser)
userRoute.get('/all-users', GetUser)
userRoute.put('/update-user/:userId', UpdateUser)
userRoute.patch('/one-update-user/:userId', SmallUpdateUser)
userRoute.delete('/delete-user/:userId', DeleteUser)

module.exports = userRoute