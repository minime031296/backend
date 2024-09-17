const {Router} = require('express')
const {PostProducts, ReadProducts, ReadSingleProduct, UpdateProduct, DeleteProduct }= require('../controller/productController')


const productRoute = Router()


productRoute.post('/post-products', PostProducts)
productRoute.get('/get-products/:category', ReadProducts)
productRoute.get('/get-singleproduct/:id', ReadSingleProduct)
productRoute.put('/put-product/:id', UpdateProduct)
productRoute.delete('/delete-product/:id', DeleteProduct)

module.exports = productRoute