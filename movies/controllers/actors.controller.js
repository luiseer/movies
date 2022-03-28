const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');

const { Actors } = require('../models/actors.model');
const { ActorMovies } = require('../models/actorMovies.model');
const { Movie } = require('../models/movies.models');

const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');
const { filterObj } = require('../util/filterObj');
const { storage } = require('../util/firebase');

exports.getAllActors = catchAsync(async (req, res, next) => {
  const actors = await Actors.findAll({
    where: { status: 'active' },
    include: [{ model: Movie, through: ActorMovies }]
  });

  const actorsPromises = actors.map(
    async ({
      id,
      name,
      country,
      age,
      rating,
      awards,
      profilePicUrl,
      status,
      createdAt,
      updatedAt,
      movies
    }) => {
      const imgRef = ref(storage, profilePicUrl);
      const imgDownloadUrl = await getDownloadURL(imgRef);

      const moviesPromises = movies.map(
        async ({
          id,
          tilte,
          description,
          duration,
          status,
          imgUrl,
          createdAt,
          updatedAt
        }) => {
          const imgRef = ref(storage, imgUrl)
          const imgDownloadUrl = await getDownloadURL(imgRef)

          return {
            id,
            tilte,
            description,
            duration,
            status,
            imgUrl: imgDownloadUrl,
            createdAt,
            updatedAt
          }
        }
      );
      const resolveMovies = await Promise.all(moviesPromises)

      return {
        id,
        name,
        country,
        age,
        rating,
        awards,
        profilePicUrl: imgDownloadUrl,
        status,
        createdAt,
        updatedAt,
        movies: resolveMovies
      }
    }
  );

  const resolveActors = await Promise.all(actorsPromises)

  res.status(200).json({
    status: 'success',
    data: {
      actors: resolveActors
    }
  });
});

exports.getActorById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const actors = await Actors.findOne({
    where: { id, status: 'active' }
  });
  if (!actors) {
    return next(new AppError(404, 'no actors found wiht the given id'));
  }

  res.status(200).json({
    sutatus: 'success',
    data: {
      actors
    }
  });
});

exports.createNewActor = catchAsync(async (req, res, next) => {
  const { name, country, age, rating } = req.body;
  if ((!name || !country || !age, !rating)) {
    return next(new AppError(400, 'Must provide a valid, name, age & country'));
  }

  const fileExtension = req.file.originalname.split('.')[1];

  const imgRef = ref(
    storage,
    `imgs/actors${name}-${Date.now()}.${fileExtension}}`
  );

  const imgUploaded = await uploadBytes(imgRef, req.file.buffer);

  const newActor = await Actors.create({
    name,
    age,
    country,
    rating,
    profilePicUrl: imgUploaded.metadata.fullPath
  });

  res.status(201).json({
    status: 'success',
    data: {
      newActor
    }
  });
});

exports.updateActor = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = filterObj(req.body, 'name', 'country', 'age, rating');
    const actor = Actors.findOne({
      where: {
        id,
        status: 'active'
      }
    });
    if (!actor) {
      res.status(404).json({
        status: 'error',
        mgs: 'Cant update actor, invalid ID'
      });
      return;
    }
    (await actor).update({ ...data });

    res.status(204).json({
      status: 'success'
    });
    res.status(204).json({ status: 'success' });
  } catch (error) {
    console.log(error);
  }
});

exports.deleteActor = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const actors = await Actors.findOne({
    where: { id, status: 'active' }
  });

  if (!actors) {
    res.status(404).json({
      status: 'error',
      msg: 'Cant delete actor, invalid ID'
    });
    return;
  }

  await actors.update({ status: 'delete' });
  res.status(204).json({ status: 'success' });
});
