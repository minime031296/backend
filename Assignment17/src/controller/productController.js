//Crud

const Product = require("../models/product.model")

const CreateProduct = async(req, res) => {
    const {productName, price,category, stock, SKU, tags} = req.body

    const product = new Product({
        productName,
        price,
        category,
        stock,
        SKU,
        tags
    })
    await product.save()

    res.status(200).json({
        success: true,
        message: "New Product created",
        details: product
    })
}

const GetProduct = async(req, res) => {
    const product = await Product.find({})

    res.status(200).json({
        success: true,
        message: "New Product created",
        details: product
    })
}

const SingleProduct = async(req, res) => {
    const {id} = req.params

    const product = await Product.findById(id)

    res.status(200).json({
        success: true,
        message: "New Product created",
        details: product
    })

}

const UpdateProduct = async(req, res) => {
    const {id} = req.params

    const {productName, price,category, stock, tags} = req.body

    const updatedPro = await Product.findByIdAndUpdate(id, {
        productName, price,category, stock, tags
    },{ new: true })
    
    await updatedPro.save()

    res.status(200).json({
        success: true,
        message: "New Updation for Product",
        details: updatedPro
    })

}

const DeleteProduct = async(req, res) => {
        const {id} = req.params

        await Product.findByIdAndDelete({id: id})

        await Product.remove()

        res.status(200).json({
            success: true,
            message: "Removed Product",
         
        })
}

module.exports = {
    CreateProduct, GetProduct, SingleProduct, UpdateProduct, DeleteProduct
}

