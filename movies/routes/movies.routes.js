const express = require('express');
const {
  validateSession,
  roleUserAdmin
} = require('../middlewares/auth.middleware');

const {
  getAllMovie,
  getMovieById,
  createNewMovie,
  updateMovie,
  deleteMovie
} = require('../controllers/movies.controllers');
const { upload } = require('../util/multer');

const router = express.Router();

router.use(validateSession);

router
  .route('/')
  .get(getAllMovie)
  .post(roleUserAdmin, upload.single('img'), createNewMovie);

router
  .route('/:id')
  .get(getMovieById)
  .delete(roleUserAdmin, deleteMovie)
  .patch(roleUserAdmin, updateMovie);

module.exports = { moviesRouter: router };
