const {Schema, model} = require('mongoose')

const authorSchema = new Schema({
    name:{
        type: "String", required: true
    },
    biography: {
        type: String
    },
    dob: {
        type: Date,
    },
    nationality: {
        type: String
    },
    books: [{
        type:  Schema.Types.ObjectId, ref: "Book"
    }]
})

const Author = model('Author', authorSchema)

module.exports = Author