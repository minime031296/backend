require('dotenv').config()
const jwt = require('jsonwebtoken')

const authToken = async(req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1] ||  req.headers.Authorization?.split(' ')[1]

    if(!token) {
        return res.status(400).json('Unauthorized: Token not provided')
    }

    jwt.verify(token , process.env.SECRET_KEY, (err, decoded) => {
        if(err) {
            return res.status(400).json('Error in verifying token') 
        }
        req.user = decoded.userId

    })
    next()

}

module.exports = authToken