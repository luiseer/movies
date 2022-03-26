const { User } = require('../models/user.model');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//utils
const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');
const { filterObj } = require('../util/filterObj');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const user = await User.findAll({
    attributes: { exclude: ['password'] },
    where: { status: 'active' },
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
    attributes: { exclude: ['password'] },
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
    const { name, email, password, role } = req.body;
    if (!name || !email || !password, !role) {
      return next(
        new AppError(400, 'Must provide a valid name, email, password')
      );
    }

    const salt = await bcrypt.genSalt(12);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    newUser.password = undefined;

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

exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: {
      email,
      status: 'active'
    }
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError(400, 'Credentials are invalid'));
  }

  const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

  res.status(200).json({
    status: 'success',
    data: { token }
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = filterObj(req.body, 'name', 'email');
    const user = User.findOne({
      where: {
        id,
        status: 'active'
      }
    });
    if (!user) {
      res.status(404).json({
        status: 'error',
        mgs: 'Cant update user, invalid ID'
      });
      return;
    }

    await (await user).update({ ...data });

    res.status(204).json({
      status: 'success'
    });
  } catch (error) {
    console.log(error.message);
  }
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const users = await User.findOne({
    attributes: { exclude: ['password'] },
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
