const express = require('express');

const {
  getAllMovie,
  getMovieById,
  createNewMovie,
  updateMovie,
  deleteMovie
} = require('../controllers/movies.controllers');
const { upload } = require('../util/multer');

const router = express.Router();

router.get('/', getAllMovie);

router.post('/', createNewMovie)

router.route('/:id').get(getMovieById).delete(deleteMovie);

router.post('/', upload.single);

router.put('/:id', updateMovie);


module.exports = { moviesRouter: router };