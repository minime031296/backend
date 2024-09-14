const { PostMovies, GetMovies, UpdateMoviePut, UpdateMoviePatch, DeleteMovies } = require("../controller/moviesController")

const {Router} = require("express")

const movieRoute = Router()

movieRoute.post('/post-movie', PostMovies)
movieRoute.get('/get-movie', GetMovies)
movieRoute.put('/update-movie/:movieId', UpdateMoviePut)
movieRoute.use('/oneupdate-movie/:movieId', UpdateMoviePatch)
movieRoute.use('/del-movie/:movieId', DeleteMovies)

module.exports = movieRoute