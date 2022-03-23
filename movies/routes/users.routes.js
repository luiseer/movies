const express = require('express');

const {
  getUserById,
  createNewUser,
  updateUser,
  deleteUser,
  getAllUsers
} = require('../controllers/users.controller');

const router = express.Router();

router.route('/').get(getAllUsers).post(createNewUser);

router
  .route('/:id')
  .get(getUserById)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = { usersRouter: router };
