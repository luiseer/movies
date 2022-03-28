const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');

const { Movie } = require('../models/movies.models');
const { User } = require('../models/user.model');
const { Actors } = require('../models/actors.model');
const { Review } = require('../models/reviews.model');
const { ActorMovies } = require('../models/actorMovies.model');

const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');
const { filterObj } = require('../util/filterObj');
const { storage } = require('../util/firebase');

exports.getAllMovie = catchAsync(async (req, res, next) => {
  const movies = await Movie.findAll({
    where: { status: 'active' },
    include: [{ model: Actors }]
  });

  const moviesPromises = movies.map(
    async ({
      id,
      tilte,
      description,
      duration,
      imgUrl,
      createdAt,
      updatedAt,
      actors
    }) => {
      const imgRef = ref(storage, imgUrl);
      const imgDownloadUrl = await getDownloadURL(imgRef);

      const actorsPromises = actors.map(
        async ({
          id,
          name,
          country,
          age,
          rating,
          awards,
          profilePicUrl,
          createdAt,
          updatedAt
        }) => {
          const imgRef = ref(storage, profilePicUrl);
          const imgDownloadUrl = await getDownloadURL(imgRef);

          return {
            id,
            name,
            country,
            age,
            rating,
            awards,
            profilePicUrl: imgDownloadUrl,
            createdAt,
            updatedAt
          };
        }
      );
      const resolveActors = await Promise.all(actorsPromises);

      return {
        id,
        tilte,
        description,
        duration,
        imgUrl: imgDownloadUrl,
        createdAt,
        updatedAt,
        actors: resolveActors
      };
    }
  );
  const resolveMovies = await Promise.all(moviesPromises);
  res.status(200).json({
    status: 'success',
    data: {
      movies: resolveMovies
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
  console.log(req.file);

  const fileExtension = req.file.originalname.split('.')[1];

  const imgRef = ref(
    storage,
    `imgs/movies/${title}-${Date.now()}.${fileExtension}`
  );

  const imgUploaded = await uploadBytes(imgRef, req.file.buffer);

  const newMovie = await Movie.create({
    title,
    description,
    duration,
    genre,
    imgUrl: imgUploaded.metadata.fullPath
  });

  actors.map(async (actorId) => {
    return await ActorMovies.create({ actorId, movieId: newMovie.id });
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
    const { id } = req.params;
    const data = filterObj(
      req.body,
      'title',
      'description',
      'duration',
      'genre'
    );
    const movie = Movie.findOne({
      where: {
        id,
        status: 'active'
      }
    });
    if (!movie) {
      res.status(404).json({
        status: 'error',
        mgs: 'Cant Update movie, invalid ID'
      });
      return;
    }
    (await movie).update({ ...data });

    res.status(204).json({
      status: 'success'
    });
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

  (await movies).update({ status: 'delete' });
  return res.status(204).json({ status: 'success' });
});
