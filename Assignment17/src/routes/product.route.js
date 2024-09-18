const {Router} = require('express')
const { CreateProduct, GetProduct, UpdateProduct, DeleteProduct, SingleProduct } = require('../controller/productController')

const ProductRoute = Router()

ProductRoute.post('/post-product', CreateProduct)
ProductRoute.get('/get-product', GetProduct)
ProductRoute.get('/get-product/:id', SingleProduct)
ProductRoute.put('/put-product/:id', UpdateProduct)
ProductRoute.delete('/delete-product/:id', DeleteProduct)

module.exports = ProductRoute