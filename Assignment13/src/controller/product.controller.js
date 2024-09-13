const Product = require("../model/product.model")

const PostProducts = async(req, res) => {
    const {productId, brand, price} = req.body

    if(!brand || !price) {
        return res.status(400).json({
            success: false, message: "All fields are required"
        })

    }

    const newProduct = new Product({
        productId,
        brand,
        price
    })

    await newProduct.save()

    res.status(200).json({
        success: true,
        message: "Product created successfully"
    })
}
const GetProducts = async(req, res) => {
    
    const Products = await Product.find({})
    res.status(200).json({
        success: true,
        message: "List of Products",
        Products: Products
    })
}
const UpdateProduct = async(req, res) => {
    const {productId} = req.params
    const {brand, price} = req.body

    const UpdateProduct = await Product.findByIdAndUpdate(productId, {
        brand,
        price
    })
    await UpdateProduct.save()

    res.status(200).json({
        success: true,
        message: "Product updated successfully"
    }
    )
}
const DeleteProduct = async(req, res) => {

    const {productId} = req.params

    await Product.findByIdAndDelete(productId)

    res.status(200).json({
        success:true,
        message: "Product removed successfully"
    })
}

module.exports = {
    PostProducts,
    GetProducts,
    UpdateProduct,
    DeleteProduct
}