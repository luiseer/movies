//models
const { Actors } = require('../models/actors.model');
//utils
const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');
const { filterObj } = require('../util/filterObj');

exports.getAllActors = catchAsync(async (req, res, next) => {
  const actors = await Actors.findAll({
    where: { status: 'active' }
  });

  res.status(200).json({
    status: 'success',
    data: {
      actors
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
  const { name, conuntry, age } = req.body;
  if (!name || !conuntry || age) {
    return next(new AppError(400, 'Must provide a valid, name, age & country'));
  }
  const newActor = await Actors.create({
    name,
    conuntry,
    age
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
    const { name, country, age } = req.body;
    if (
      !name ||
      !country ||
      !age ||
      name.length === 0 ||
      country.length === 0 ||
      age.length === 0
    ) {
      res.status(400).json({
        status: 'error',
        msg: 'Must provie a name, country and age for this req'
      });
      return;
    }

    const actors = await Actors.findOne({
      where: { id, status: 'active' }
    });

    if (!actors) {
      res.status(404).json({
        status: 'error',
        msg: 'Cant update actor, invalid ID'
      });
    }

    await actors.update({
      name,
      country,
      age
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
