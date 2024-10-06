const {Router} = require('express')
const checkRole = require('../middlewares/role')
const Book = require('../models/books.model')


const bookRouter = Router()

bookRouter.get('/books',async(req, res) => {
    const books = await Book.find({}).populate('roles')
    res.status(200).json({
        success: true,
        message: "List of books",
        books: books
    })
})

bookRouter.post('/books', checkRole(['admin']),async(req, res) => {
    const authorId = req.params.authorId
    const {title, ISBN, summary, publicationDate, genre, copiesAvailable} = req.body

    const book = new Book({
        title,
        ISBN,
        summary,
        publicationDate,
        genre,
        copiesAvailable,
        authorId
    })
    await book.save()

    res.status(200).json({
        success: true,
        message: "List of books",
        book: book
    })
})

bookRouter.get('/books/:id',async(req, res) => {
    const id = req.params.id
    const authorId = req.params.authorId
    const books = await Book.findById(id).populate('Book')
    res.status(200).json({
        success: true,
        message: "List of books",
        books: books
    })
})

bookRouter.put('/books/:id',checkRole(['admin']), async(req, res) => {
    const id = req.params.id
    const {title, summary, publicationDate, genre, copiesAvailable} = req.body

    const  updatebook = {}
    if(title) updatebook.title = title;
    if(summary) updatebook.summary =  summary;
    if(publicationDate) updatebook.publicationDate = publicationDate
    if(genre) updatebook.genre = genre
    if(copiesAvailable) updatebook.copiesAvailable = copiesAvailable
    const book = await Book.findByIdAndUpdate(id, updatebook, {new:true})
    res.status(200).json({
        success: true,
        message: "book detail",
        book: book
    })

})

bookRouter.delete('/books/:id', checkRole(['admin']),async(req, res) => {
    const id = req.params.id
    
    await Book.findByIdAndDelete(id)
    res.status(200).json({
        success: true,
        message: "book Deleted",
    })
})

module.exports = bookRouter