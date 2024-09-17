const Product = require("../model/product.model")

const PostProducts = async(req, res) => {
    const {name, price, category, stock, created_at} = req.body

    if(!name || !price || !category || !stock || !created_at) {
        return res.status(400).json({
            success:false, message: `Enter all product details`
        })
    }

    try {
        const newProduct = new Product({
            name,
            price,
            category,
            stock,
            created_at
        })
        await newProduct.save()

        res.status(200).json({
            success: true,
            message: `New Product created`
        })
    } catch (error) {
        res.status(200).json({
            success: false,
            message: error.message
        })
    }
}

const ReadProducts = async(req, res) => {
    const {category} = req.params

    const products = await Product.find({category: category})

    res.status(200).json({
        success: true,
        message: "List of Products with respect to certain category",
        products: products
    })
}

const ReadSingleProduct = async(req, res) => {
    const {id} = req.params

    const product = await Product.findById(id).populate('category')
    
    res.status(200).json({
        success: true,
        message: "Product details",
        product: {
            name: product.name,
            price: product.price,
            category: product.category,  
            stock: product.stock,
            created_at: product.created_at
        }
    });
}

const UpdateProduct = async(req, res) => {
    const {id} = req.params
    let {price, stock, category} = req.body

    const product = await Product.findByIdAndUpdate(id, {
        price: price,
        stock: stock,
        category
    })

    await product.save()

    res.status(200).json({
        success: true,
        message: "Updated Product details",
        product: product
    })
}

const DeleteProduct = async(req, res) => {
    const {id} = req.params

    await Product.findByIdAndDelete(id)

    res.status(200).json({
        success: true,
        message: "Product Removed"
    })
}
module.exports = {
    PostProducts , 
    ReadProducts,
    ReadSingleProduct,
    UpdateProduct,
    DeleteProduct
}