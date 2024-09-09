const { Router } = require('express');
const fs = require('fs');
const path = require('path');
const userRoutes = Router();

const usersFilePath = path.join(__dirname, 'user.json');


const readFileUser = () => {
    try {
        const data = fs.readFileSync(usersFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        
        return [];
    }
};


const writeFileUser = (users) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
};

userRoutes.post('/', async (req, res) => {
    const { name, email, password } = req.body;

    
    const newId = Date.now();

   
    const newUser = {
        id: newId,
        name,
        email,
        password
    };

    try {
      
        const users = readFileUser();

      
        users.push(newUser);

       
        writeFileUser(users);

       
        res.status(201).json({
            message: 'New user created',
            user: newUser
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({
            message: 'Error creating user',
            error: error.message
        });
    }
});


userRoutes.get("/", async (req, res) => {
    let data = readFileUser()
    return res.status(200).json({"users": data})
})

userRoutes.put('/:id', (req, res) => {
    const { id } = req.params; 
    const { name, email, password } = req.body;

    try {
       
        const users = readFileUser();
        
        const userIndex = users.findIndex(user => user.id === parseInt(id, 10));

        users[userIndex] = {
            ...users[userIndex],
            name,
            email,
            password
        };

        
        writeFileUser(users);
        
        res.status(200).json({
            message: 'User updated successfully',
            user: users[userIndex]
        });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({
            message: 'Error updating user',
            error: error.message
        });
    }
});

userRoutes.patch('/:id', (req, res) => {
    const { id } = req.params; 
    const { name, email, password } = req.body;

    try {
       
        const users = readFileUser();
        
        const userIndex = users.findIndex(user => user.id === parseInt(id, 10));

        users[userIndex] = {
            ...users[userIndex],
            ...(name &&  {name}),
            ...(email && {email}),
            ...(password && {password})
        };

        
        writeFileUser(users);
        
        res.status(200).json({
            message: 'User updated successfully',
            user: users[userIndex]
        });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({
            message: 'Error updating user',
            error: error.message
        });
    }
});

userRoutes.delete('/:id', (req, res) => {
    const { id } = req.params; 

    try {
        let users = readFileUser();
        
        const updatedUsers = users.filter(user => user.id !== parseInt(id, 10));
        
        writeFileUser(updatedUsers);
        
        res.status(200).json({
            message: 'User deleted successfully'
        });
    
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({
            message: 'Error deleting user',
            error: error.message
        });
    }
});


module.exports = userRoutes;
