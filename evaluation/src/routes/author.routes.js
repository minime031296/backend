const {Router} = require('express')
const checkRole = require('../middlewares/role')
const Author = require('../models/authors.model')


const authorRouter = Router()

authorRouter.get('/authors',async(req, res) => {
    const authors = await Author.find({}).populate('Book')
    res.status(200).json({
        success: true,
        message: "List of authors",
        authors: authors
    })

})

authorRouter.post('/authors', checkRole(['admin']),async(req, res) => {
    const {name, bio, nationality, dob} = req.body

    const author = new Author({
        name,
        bio,
        nationality,
        dob
    })
    await author.save()

    res.status(200).json({
        success: true,
        message: "List of authors",
        author
    })
})

authorRouter.get('/authors/:id',async(req, res) => {
    const id = req.params.id
    const authors = await Author.findById(id).populate('Book')
    res.status(200).json({
        success: true,
        message: "List of authors",
        authors
    })
})

authorRouter.put('/authors/:id',checkRole(['admin']),async(req, res) => {
    const id = req.params.id
    const {name, bio, nationality, dob} = req.body

    const  updateauthor = {}
    if(name) updateauthor.name = name;
    if(bio) updateauthor.bio = bio;
    if(nationality) updateauthor.nationality = nationality
    if(dob) updateauthor.dob = dob
    const author = await Author.findByIdAndUpdate(id, updateauthor, {new:true})
    res.status(200).json({
        success: true,
        message: "Author detail",
        author: author
    })

})

authorRouter.delete('/authors/:id', checkRole(['admin']),async(req, res) => {
    const id = req.params.id
    
    await Author.findByIdAndDelete(id)
    res.status(200).json({
        success: true,
        message: "author Deleted",
    })
})

module.exports = authorRouter