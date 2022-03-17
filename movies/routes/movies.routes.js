const express = require('express')

const {
    getAllMovie,
    getMovieById,
    createNewMovie,
    updateMovie,
    deleteMovie
} = require('../controllers/movies.controllers')

const router = express.Router()

router.get('/', getAllMovie)

router.get('/:id', getMovieById)

router.post('/', createNewMovie)

router.put('/:id', updateMovie)

router.delete('/:id', deleteMovie)

module.exports = {moviesRouter: router}