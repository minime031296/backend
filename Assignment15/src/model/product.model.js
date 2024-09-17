const {Schema, model} = require('mongoose')

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        validate: {
            validator : function(price) {
                return price > 0 
            },
        message: 'Price must be a positive number'
        }
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',  
        required: true
    },
    stock: {
        type: Number,
        required: true,
        default :0
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

const Product = model('Product', productSchema)

module.exports = Product