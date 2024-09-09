const { Router } = require('express');
const fs = require('fs');
const path = require('path');
const todoRoutes = Router();

const todoPathFile = path.join(__dirname, "todo.json");

const todoFileRead = () => {
    if (fs.existsSync(todoPathFile)) {
        const data = fs.readFileSync(todoPathFile, 'utf-8');
        return JSON.parse(data);
    } else {
        return []; 
    }
}

const writeFileTodo = (todo) => {
    fs.writeFileSync(todoPathFile, JSON.stringify(todo, null, 2), "utf-8");
}

todoRoutes.post('/', (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ message: "Title and description are required" });
    }

    const todoId = Date.now();

    const newTodo = {
        id: todoId,
        title,
        description
    };

    const todo = todoFileRead();
    todo.push(newTodo);
    writeFileTodo(todo);

    res.status(201).json({
        message: "Todo created successfully",
        todo: newTodo
    });
});

todoRoutes.get("/", async (req, res) => {
    let data = todoFileRead()
    return res.status(200).json({"todos": data})
})

todoRoutes.put('/:id', async (req, res) => {
    const {id} = req.params
    const {title, description} = req.body

    let todos = todoFileRead()

    let todosIndex = todos.findIndex(todo => todo.id === parseInt(id, 10))

    todos[todosIndex] = {
        ...todos[todosIndex],
        title,
        description
    }

    writeFileTodo(todos)

    res.status(200).json({
        message: 'Todo updated successfully',
        todo: todos[todosIndex]
    })
})

todoRoutes.patch('/:id', async(req,res)=> {
    let {id} = req.params
    let {title, description} = req.body

    let todos = todoFileRead()

    let todoIndex = todos.findIndex(todo=> todo.id === parseInt(id, 10))

    let UpdatedTodo = {
        ...todos[todoIndex],
        ...(title && {title}),
        ...(description && {description})
    }

    writeFileTodo(todos)

    res.status(200).json({
        message: 'Todo updated successfully',
        user: todos[todoIndex]
    });

})

todoRoutes.delete('/:id', (req, res)=>{
    let {id} = req.params 

    try {
        
        let todos = todoFileRead()
        
        let deleteTodo = todos.filter(todo => todo.id !== parseInt((id, 10)))

        writeFileTodo(deleteTodo)

        res.status(200).json({
            message: "Todo deleted successfully",
            
        })
    } catch (error) {
        console.error('Error deleting todo:', error);
        res.status(500).json({
            message: 'Error deleting todo',
            error: error.message
        });
    }

})
module.exports = todoRoutes;
