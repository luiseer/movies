const { User } = require('../models/user.model');
//utils
const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');
const { filterObj } = require('../util/filterObj');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const user = await User.findAll({
    where: { status: 'active' }
  });
  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});

exports.getUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const users = await User.findOne({
    where: { id, status: 'active' }
  });
  if (!users) {
    return next(new AppError(404, 'no users found wiht the given ID'));
  }

  res.status(200).json({
    status: 'success',
    data: {
      users
    }
  });
});

exports.createNewUser = catchAsync(async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return next(
        new AppError(400, 'Must provide a valid name, email, password')
      );
    }
    const newUser = await User.create({
      name,
      email,
      password
    });

    res.status(200).json({
      status: 'success',
      data: {
        newUser
      }
    });
  } catch (error) {
    console.log(`este es el error ${error.message}`);
  }
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  if (
    !name ||
    !email ||
    !password ||
    name.length === 0 ||
    email.length === 0 ||
    password.length === 0
  ) {
    res.status(400).json({
      status: 'error',
      mgs: 'Must provide a user name, email and password '
    });
    return;
  }
  const users = await User.findOne({
    where: { id, status: 'active' }
  });

  if (!users) {
    res.status(404).json({
      status: 'error',
      msg: 'Cant find actor, invalid ID'
    });
    return;
  }
  await users.update({
    name,
    email,
    password
  });
  res.status(204).json({ status: 'success' });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const users = await User.findOne({
    where: { id, status: 'active' }
  });

  if (!users) {
    res.status(404).json({
      status: 'error',
      msg: 'Cant delete actor, invalid ID'
    });
    return;
  }

  await users.update({ status: 'delete' });
  res.status(204).json({ status: 'success' });
});
