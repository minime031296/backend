const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    username:{type: String, unique:true, required: true},
    password: {type: String, required: true},
    roles: {
        type: String,
        enum: ['member', 'admin'],
        default: 'member'
    },
    name:{type: String, required: true},
    email: {type: String, required: true,unique:true},
    borrowed_books: [{
        type: Schema.Types.ObjectId, ref: "Book"
    }]
})

const User = model('User', userSchema)

module.exports = User