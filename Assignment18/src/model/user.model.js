const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    name: {
        type: String, required: true, minlength: 3
    },
    email: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    },
    phone: {
        type: String, 
        required: true,
        validate: {
            validator: (v) => /^[0-9]{10}$/.test(v), 
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    age: {
        type: Number,
        min: 18,
        max: 65,
        required: false
    }
})

const User = model('User', userSchema)

module.exports = User