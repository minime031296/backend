const {Schema, model} = require('mongoose')
const {v4: uuidv4} = require('uuid')

const productSchema = new Schema({
    productId: {
        type: String,
        default: uuidv4
    },
    brand: {
        type: String,
        required: true
    },
    price: {
        type: String,
        require: true
    }
})

const Product = model('Product', productSchema)

module.exports = Product