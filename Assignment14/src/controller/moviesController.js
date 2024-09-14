const Movies = require("../model/movies.model")

const PostMovies = async(req, res) => {
    const {movieId, title, cast, rating} = req.body

    if (!title || !cast || !rating) {
        return res.status(400).json({
            success: false,
            message: "Enter all movie fields"
        })
    }

    const newMovie = new Movies({
        movieId,
        title,
        cast,
        rating
    })

    await newMovie.save()

    res.status(200).json({
        success: true,
        message: "New Movie Posted",
        movieId: movieId,
        movies: newMovie 
    })
}

const GetMovies = async (req, res) => {
    
    
    let queryObj = {}
    if(req.query.title){
    queryObj.title = {$regex: req.query.title, $options: "i"}
    }

    if(req.query.rating) {
        queryObj.rating = req.query.rating
    }

    let sortObj = {}
    if(req.query.sort) {
        sortObj[req.query.sort] = req.query.order == 'asc' ? 1 : -1
    }

    let page;
    let limit;

    if(req.query.page) {
        page = req.query.page
    }

    if(req.query.limit) {
        limit = req.query.limit
    }

    const movies = await Movies.find(queryObj).sort(sortObj).skip((page - 1) * limit).limit(limit)
    res.status(200).json({
        success: true,
        message: "List of all movies",
        movies: movies
    })
}

const UpdateMoviePut = async (req, res) => {
    const {movieId} = req.params
    const {title, cast, rating} = req.body

    const updateMovie = await Movies.findOneAndUpdate({movieId: movieId}, {
        title,
        cast,
        rating
    })
    await updateMovie.save()
    res.status(200).json({
        success: true,
        message: "Movie updated",
        movieId: movieId,
        movie: updateMovie
    })
}

const UpdateMoviePatch = async (req, res) => {
    const {movieId} = req.params
    
    const {title, cast, rating} = req.body

    const movieFields = {}

    if(title) movieFields.title = title
    if(cast) movieFields.cast = cast
    if(rating) movieFields.rating = rating

    const updateMovie = await Movies.findOneAndUpdate({movieId: movieId}, movieFields)

    if (!updateMovie) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    res.status(200).json({
        success: true,
        message: "User data updated successfully",
        user: updateMovie
    });
}

const DeleteMovies = async (req, res) => {
    const {movieId} = req.params

    await Movies.findOneAndDelete({movieId: movieId})

    res.status(200).json({
        success: true, message: "movie removed"
    })
}






module.exports = {
    PostMovies, GetMovies, UpdateMoviePut, UpdateMoviePatch, DeleteMovies
}

 /*, , */