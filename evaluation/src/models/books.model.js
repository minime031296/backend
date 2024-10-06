const {Schema, model} = require('mongoose')

const BookSchema = new Schema({
    title: {
        type: String, required: true
    },
    ISBN:{
        type: String, required: true, unique: true
    },
    summary: {
        type: String
    },
    publicationDate: {
        type: Date
    },
    genre: {
        type: [String]
    },
    copiesAvailable: {
        type: Number,
        default: 1
    },
    authorId: [{
        type:  Schema.Types.ObjectId, ref: "Author"
    }],
    borrowedby: [{
        type:  Schema.Types.ObjectId, ref: "User"
    }]
})

const Book = model('Book', BookSchema)

module.exports = Book