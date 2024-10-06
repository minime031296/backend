require('dotenv').config()
const {Router} = require('express')
const User = require('../models/users.model')
const Bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const authRouter = Router()

authRouter.post('/register', async(req, res) => {
    try {
        const {username, password, name, email} = req.body

        if(!username || !password || !name || !email) {
            return res.status(401).json("All fields are required")
        }

        const existinguser = await User.findOne({email})

        if(existinguser) {
            return res.status(401).json("User already exists")
        }

        const hashedPassword = await Bcrypt.hash(password, 10)
        const user = new User({
            username, 
            email,
            password: hashedPassword,
            name,
            
        })

        await user.save()
        res.status(200).json({
            success: true,
            message: "User registered",
            user: {
                username, 
                email,
                name
            }
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            success: false,
            message: "User not registered",
        })
    }
})

authRouter.post('/login', async(req, res) => {
    try {
        const {email, password} = req.body

        if(!email || !password) {
            return res.status(401).json("All fields are required")
        }

        const user = await User.findOne({email})

        if(!user) {
            return res.status(401).json("User needs to register")
        }

        const confirmPassword = await Bcrypt.compare(password, user.password)

        if(!confirmPassword) {
            return res.status(401).json("Invalid credentials")
        }

        const accessToken = jwt.sign({
            userId: user._id, email: user.email, roles: user.role
        }, process.env.SECRET_KEY, {expiresIn: '15min'})

        const refreshToken = jwt.sign({
            userId: user._id, email: user.email, roles:user.role
        }, process.env.SECRET_KEY, {expiresIn: '2days'})

        
        res.status(200).json({
            success: true,
            message: "login successful",
            token: {
                accessToken, refreshToken
            }
        })

     } catch (error) {
        
        res.status(500).json({
            success: false,
            message: "User not login",
        })
    }
})

module.exports = authRouter