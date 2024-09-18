const {Schema, model} = require('mongoose')

const productSchema = new Schema({
    productName: {
        type: String, required: true, maxlength: 50
    },
    price: {
        type: Number, required: true, min: 0
    },
    category: {
        type: String,
        enum: ["Electronics", "Clothing", "Books", "Home Appliances"],
        required: true
    },
    stock: {
        type: Number,
        required: true,
        min:0
    },
    SKU: {
        type: String, unique: true, required: true, match: /^PROD-\d{4}$/
    },
    tags: {
        type: [String],
        required: true,
        validate: {
            validator: function(v) {
                return v.length === new Set(v).size && v.every(tag =>  /^[a-zA-Z0-9]+$/.test(tag))
            },
            message: `Tags must be unique and cannot contain special characters.`
        }
    }

})

const Product = model("Product", productSchema)

module.exports = Product