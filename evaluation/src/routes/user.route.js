const {Router} = require('express')
const checkRole = require('../middlewares/role')
const User = require('../models/users.model')

const userRouter = Router()

userRouter.get('/users', checkRole(['admin']),async(req, res) => {
    const users = await User.find({}).populate('roles')
    res.status(200).json({
        success: true,
        message: "List of Users",
        user: users
    })

})

userRouter.get('/users/:id', checkRole(['admin', 'member']),async(req, res) => {
    const id = req.params.id
    const users = await User.findById(id)
    res.status(200).json({
        success: true,
        message: "User detail",
        user: users
    })
})

userRouter.put('/users/:id', checkRole(['admin', 'member']),async(req, res) => {
    const id = req.params.id
    const {email, password, name} = req.body

    const updatedData = {}
    if(email) updatedData.email = email;
    if(name) updatedData.name = name;
    if(password) updatedData.password = password
    const users = await User.findByIdAndUpdate(id, updatedData, {new:true})
    res.status(200).json({
        success: true,
        message: "User detail",
        user: users
    })

})

userRouter.delete('/users/:id', checkRole(['admin']),async(req, res) => {
    const id = req.params.id
    
    await User.findByIdAndDelete(id)
    res.status(200).json({
        success: true,
        message: "User Deleted",
    })

})

module.exports = userRouter