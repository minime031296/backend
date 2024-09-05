const express = require('express');
const { log } = require('console');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dbPath = path.join(__dirname, 'db.json');

// Ensure db.json exists
async function dbPathExist() {
    try {
        await fs.access(dbPath);
    } catch (error) {
        if (error.code === 'ENOENT') {
            try {
                await fs.writeFile(dbPath, JSON.stringify({ todos: [] }, null, 2));
                log('db.json created');
            } catch (writeErr) {
                log('Error creating db.json:', writeErr);
            }
        } else {
            log('Error checking db.json:', error);
        }
    }
}

// Read data from db.json
async function readFileDb() {
    try {
        const data = await fs.readFile(dbPath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        log('Error reading db.json:', error);
        return { todos: [] }; // Return an object with an empty todos array on error
    }
}

// Write data to db.json
async function writeFileDb(data) {
    try {
        await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
    } catch (error) {
        log('Error writing db.json:', error);
    }
}

// Create a new todo
app.post('/todos', async (req, res) => {
    const { title, description } = req.body;

    if (!title || typeof title !== 'string') {
        return res.status(400).json({ message: 'Invalid title' });
    }

    if (description && typeof description !== 'string') {
        return res.status(400).json({ message: 'Invalid description' });
    }

    let db = await readFileDb();
    
    const newId = db.todos.length > 0 ? db.todos[db.todos.length - 1].id + 1 : 1;
    
    const newTodo = {
        id: newId,
        title,
        description: description || '',
        status: false,
    };
    
    db.todos.push(newTodo);
    await writeFileDb(db);
    res.status(201).json({ message: 'Todo created', newTodo });
});

// Get all todos
app.get('/todos', async (req, res) => {
    try {
        const db = await readFileDb();
        res.status(200).json(db.todos);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving todos' });
    }
});

// Update a specific todo by ID


// Update status of todos with even IDs
// Update a specific todo by ID
app.patch('/todos/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const db = await readFileDb();
        const todoIndex = db.todos.findIndex(todo => todo.id === parseInt(id));

        if (todoIndex === -1) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        // Update only the fields present in the request body
        const todo = db.todos[todoIndex];
        for (const key in updates) {
            if (todo.hasOwnProperty(key)) {
                todo[key] = updates[key];
            }
        }

        await writeFileDb(db);
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ message: 'Error updating todo' });
    }
});


// Delete todos with status true
app.delete('/todos/:id', async (req, res) => {
    try {
        const db = await readFileDb();
        
        db.todos = db.todos.filter(todo => !todo.status);
        await writeFileDb(db);
        res.status(204).send(); 
    } catch (error) {
        res.status(500).json({ message: 'Error deleting todos' });
    }
});

// Start the server
async function startServer() {
    await dbPathExist();
    app.listen(PORT, () => {
        log(`Server is running at Port: ${PORT}`);
    });
}
startServer();
