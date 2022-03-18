const { User } = require('../models/user.model');
//utils
const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');
const { filterObj } = require('../util/filterObj');

exports.getAllUser = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    where: { status: 'active' }
  });

  res.status(200).json({
    status: 'success',
    data: {
      users
    }
  });
});
exports.getUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const users = await User.findOne({
    where: { id, status: 'active' }
  });
  if (!users) {
    return next(
        new AppError(
            404, 'no users found wiht the given ID'
        ));
  }

  res.status(200).json({
    status: 'success',
    data: {
      users
    }
  });
});

exports.createNewUser = catchAsync(async (req, res, next) => {
  const { userName, email, password } = req.body;
  if (!userName || !email || password) {
    return next(
      new AppError(400, 'Must provide a valid name, email, password')
    );
  }
  const newUser = await User.create({
    userName,
    email,
    password
  });

  res.status(200).json({
    status: 'success',
    data: {
      newUser
    }
  });
});
exports.updateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { userName, email, password } = req.body;
  if (
    !userName ||
    !email ||
    !password ||
    userName.length === 0 ||
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
      where: {id, status: 'active'}
  })

  if (!users) {
    res.status(404).json({
        status: 'error',
        msg: 'Cant user actor, invalid ID'
      });
      return
  }
  await users.update({
      userName,
      email,
      password
  })
  res.status(204).json({ status: 'success' })


});

exports.deleteUser = catchAsync(async (req, res, next) => {

    const { id } = req.params
    const users = await User.findOne({
        where: { id, status: 'active' }
    })

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
