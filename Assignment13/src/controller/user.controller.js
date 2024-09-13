const User = require("../model/user.model")
const bcrypt = require('bcryptjs')

const CreateUser = async (req, res) => {
    const {userId, username, email, password} = req.body

    if(!username || !email || !password) {
        return res.status(400).json({success: false, message: "All fields are required"})
    }

    const existingUser = await User.findOne({email})

    if(existingUser) {
        return res.status(401).json({success: false, message: "User already exist"})
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({
        userId,
        username,
        email,
        password: hashedPassword
    })
    await newUser.save()

    res.status(200).json({
        success: true,
        message: "User created successfully",
        userId: newUser.userId
    })

}

const GetUser = async (req, res) => {
    const user = await User.find({})
    return res.status(200).json({
        success: true,
        message: "List of all users",
        users: user
    })
}

const UpdateUser = async (req, res) => {
    const {userId} = req.params

    const {username, email, password} = req.body

    const updateUser = await User.findByIdAndUpdate(userId, {
        username: username || null,
        email: email || null,
        password: password || null 
    })

    res.status(200).json({
        success: false,
        message: "User data updated successfully",
        user: updateUser
    })
}

const SmallUpdateUser = async (req, res) => {
    const { userId } = req.params;
    const { username, email, password } = req.body;

    
    const updateFields = {};
    if (username) updateFields.username = username;
    if (email) updateFields.email = email;
    if (password) updateFields.password = password;

    try {
        
        const updateUser = await User.findByIdAndUpdate(userId, updateFields, { new: true });

        if (!updateUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "User data updated successfully",
            user: updateUser
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

const DeleteUser = async (req, res) => {
    const {userId} = req.params
    

    const delUser = await User.findByIdAndDelete(userId)

    res.status(200).json({
        success: true,
        message: "User deleted Successfully",
        user: delUser
    })
    
 }


module.exports = {
    CreateUser,
    GetUser,
    UpdateUser,
    SmallUpdateUser,
    DeleteUser
}