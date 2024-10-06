const {Schema, model} = require('mongoose')

const btranSchema = new Schema({
    book: [{
        type:  Schema.Types.ObjectId, ref: "Book"
    }],
    member: [{
        type:  Schema.Types.ObjectId, ref: "User"
    }],
    borrowdate: {
        type: Date,
        default: Date.now()
    },
    duedate: {
        type: Date, required: true
    },
    returndate: {
        type: Date
    },
    status: {
        type: String,
        enum :['borrowed', 'returned'],
        default: 'borrowed'
    }
})

const Btran = model('Btran', btranSchema)

module.exports = Btran