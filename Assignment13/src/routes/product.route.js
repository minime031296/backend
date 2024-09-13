const {Router} = require('express')
const { PostProducts, GetProducts, UpdateProduct, DeleteProduct } = require('../controller/product.controller')

const productRoute = Router()

productRoute.post('/post-product', PostProducts)
productRoute.get('/get-products', GetProducts)
productRoute.put('/update-product/:productId', UpdateProduct)
productRoute.delete('/delete-product/:productId', DeleteProduct)

module.exports = productRoute