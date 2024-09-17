const {Schema, model, default: mongoose} = require('mongoose')

const categorySchema = new Schema({
   name: {
    type: String,
    required: true,
    unique: true
   },
   description: {
    type: String,
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'  
    }]
})

const Category = model('Category', categorySchema)

module.exports = Category