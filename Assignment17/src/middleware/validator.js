const Joi = require('@hapi/joi')

const schema = Joi.object({
    productName: Joi.string().min(1).max(50).required(),
    price: Joi.number().positive().required(),
    category: Joi.string().valid("Electronics", "Books", "Home Appliances", "Clothing").required(),
    stock:Joi.number().integer().positive().required(),
    SKU: Joi.string().pattern(/^PROD-\d{4}$/).required(),
    tags: Joi.array().items(Joi.string().pattern(/^[a-zA-Z0-9]+$/)).unique().required()

})

module.exports = schema