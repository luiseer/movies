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

router.route('/').get(getAllMovie).post(createNewMovie);

router.route('/:id').get(getMovieById).delete(deleteMovie).patch(updateMovie);

module.exports = { moviesRouter: router };
