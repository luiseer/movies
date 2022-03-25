const { Movie } = require('../models/movies.models');
const { User } = require('../models/user.model');

//utils
const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');
const { filterObj } = require('../util/filterObj');
const { Review } = require('../models/reviews.model');
const { Actors } = require('../models/actors.model');

exports.getAllMovie = catchAsync(async (req, res, next) => {
  const movies = await Movie.findAll({
    include: [{model: Review}],
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
  const { title, description, duration, genre, actors } = req.body;
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
  try {
    const { id } = req.params
    const data = filterObj(
      req.body,
      'title',
      'description',
      'duration',
      'genre'
    )
    const movie = Movie.findOne({
      where: {
        id,
        status: 'active'
      }
    })
    if (!movie) {
      res.status(404).json({
        status: 'error',
        mgs: 'Cant Update movie, invalid ID'
      })
      return
    }
    await movie.update({...data})

    res.status(204).json({
      status: 'success'
    })
  } catch (error) {
    console.log(error);
  }
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
