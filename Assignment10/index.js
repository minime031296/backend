const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const validator = (req, res, next) => {
    const { id, name, rating, description, genre, cast } = req.body;

    
    if (typeof id !== 'number' || id <= 0) {
        return res.status(400).json({ error: 'Id must be a positive number' });
    }

    
    if (typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ error: 'Name should be a non-empty string' });
    }

    
    if (typeof rating !== 'number') {
        return res.status(400).json({ error: 'Rating should be a number' });
    }

    
    if (typeof description !== 'string' || description.trim() === '') {
        return res.status(400).json({ error: 'Description should be a non-empty string' });
    }

    
    if (typeof genre !== 'string' || genre.trim() === '') {
        return res.status(400).json({ error: 'Genre should be a non-empty string' });
    }

    
    if (!Array.isArray(cast) || !cast.every(item => typeof item === 'string')) {
        return res.status(400).json({ error: 'Cast must be an array of strings' });
    }

    next();
};


app.post('/', validator, (req, res) => {
    res.status(200).json({ message: 'Data received' });
});


app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});
