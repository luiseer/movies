const { Movie } = require('../models/movies.models');
//utils
const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');
const { filterObj } = require('../util/filterObj');

exports.getAllMovie = catchAsync(async (req, res, next) => {
  const movies = await Movie.findAll({
    where: { status: 'active' }
  });
  res.status(200).json({
    status: 'success',
    data: {
      movies
    }
  });
});
exports.getMovieById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const movies = await Movie.findOne({
    where: { id, status: 'active' }
  });
  if (!movies) {
    return next(new AppError(404, 'no movies found wiht the given ID'));
  }
  res.status(200).json({
    status: 'success',
    data: {
      movies
    }
  });
});
exports.createNewMovie = catchAsync(async (req, res, next) => {
  const { title, description, duration, genre } = req.body;
  if (!title || !description || !duration || !genre) {
    return next(
      new AppError(
        400,
        'Must provide a valid title, description, duration and gener'
      )
    );
  }

  const newMovie = await Movie.create({
    title,
    description,
    duration,
    genre
  });

  res.status(200).json({
    status: 'success',
    data: {
      newMovie
    }
  });
});

exports.updateMovie = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { title, description, duration, gener } = req.body;
  if (
    !title ||
    !description ||
    !duration ||
    !gener ||
    title.length === 0 ||
    description.length === 0 ||
    duration.length === 0 ||
    gener.length === 0
  ) {
    res.status(400).json({
      status: 'error',
      mgs: 'Must provide a user name, email and password '
    });
    return;
  }
  const movies = await Movie.findOne({
    where: { id, status: 'active' }
  });

  if (!movies) {
    res.status(404).json({
      status: 'error',
      msg: 'Cant user actor, invalid ID'
    });
    return;
  }
  await movies.update({
    title,
    description,
    duration,
    gener
  });
  res.status(204).json({ status: 'success' });
});
exports.deleteMovie = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const movies = Movie.findOne({
    where: { id, status: 'active' }
  });
  if (!movies) {
    res.status(404).json({
      status: 'error',
      msg: 'Cant delete movie, invalid id'
    });
    return;
  }

  await movies.update({ status: 'delete' });
  res.status(204).json({ status: 'success' });
});
