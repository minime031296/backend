const {Router} = require('express')
const {PostCategory, UpdateCategory, Deletecategory, DeleteCategoryAndMoveProducts} = require('../controller/categoryController')


const categoryRoute = Router()

categoryRoute.post('/post-category', PostCategory)
categoryRoute.patch('/patch-category/:id', UpdateCategory)
categoryRoute.delete('/categories/:id/delete', Deletecategory);
categoryRoute.delete('/categories/:id/move-products', DeleteCategoryAndMoveProducts);

module.exports = categoryRoute