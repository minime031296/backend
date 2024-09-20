const User = require("../model/user.model");

const CreateUser = async (req, res) => {
    try {
        const { name, email, phone, age } = req.body;

        const user = new User({
            name,
            email,
            phone,
            age
        });

        await user.save();

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            details: user
        });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({
            success: false,
            message: 'Error creating user',
            error: error.message
        });
    }
};

const GetUser = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            message: 'User list retrieved',
            details: users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving users',
            error: error.message
        });
    }
};

const UpdateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, age } = req.body;

        const updateData = {};
        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (phone) updateData.phone = phone;
        if (age) updateData.age = age;

        const user = await User.findByIdAndUpdate(id, updateData, { new: true });
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            details: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating user',
            error: error.message
        });
    }
};

const DeleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndDelete(id);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'User deleted successfully',
            details: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting user',
            error: error.message
        });
    }
};

module.exports = {
    CreateUser,
    GetUser,
    UpdateUser,
    DeleteUser
};
