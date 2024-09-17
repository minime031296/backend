const Category = require("../model/category.model");
const Product = require("../model/product.model");

const PostCategory = async (req, res) => {
    const { name, description, products } = req.body;

    if (!name || !description || !products) {
        return res.status(400).json({
            success: false,
            message: "Please provide all required fields"
        });
    }

    try {
       
        const existingCategory = await Category.findOne({ name });

        if (existingCategory) {
            return res.status(400).json({
                success: false,
                message: "Category with this name already exists"
            });
        }

        const newCategory = new Category({
            name,
            description,
            products 
        });

        await newCategory.save();

        res.status(201).json({
            success: true,
            message: "Category saved"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const UpdateCategory = async(req, res) => {
    const {id} = req.params

    const {description} = req.body

    const updation = await Category.findByIdAndUpdate(id, {
        description
    })

    res.status(200).json({
        success: true,
        message: "Updated Category",
        updation
    })
}

const Deletecategory = async(req, res) => {
    const {id} = req.params

    const category = await Category.findByIdAndDelete(id)

    await Product.deleteMany({category: id})


    res.status(200).json({
        success: true,
        message: "Category removed",
        category
    })
}

const Category = require("../model/category.model");
const Product = require("../model/product.model");

const DeleteCategoryAndMoveProducts = async (req, res) => {
    const { id } = req.params; // Extract category ID from URL parameters

    try {
        // Find and delete the category
        const category = await Category.findByIdAndDelete(id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        // Check if "Uncategorized" category exists or create it
        let uncategorizedCategory = await Category.findOne({ name: "Uncategorized" });

        if (!uncategorizedCategory) {
            uncategorizedCategory = new Category({
                name: "Uncategorized",
                description: "Category for uncategorized products",
                products: []
            });
            await uncategorizedCategory.save();
        }

        // Move all products associated with the deleted category to "Uncategorized"
        await Product.updateMany(
            { category: id },
            { $set: { category: uncategorizedCategory._id } }
        );

        res.status(200).json({
            success: true,
            message: "Category deleted and products moved to 'Uncategorized'"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = DeleteCategoryAndMoveProducts;


module.exports = {
    PostCategory,
    UpdateCategory,
    Deletecategory,
    DeleteCategoryAndMoveProducts
};
