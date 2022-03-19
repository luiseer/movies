const express = require('express');

const {
  getUserById,
  createNewUser,
  updateUser,
  deleteUser,
  getAllUsers
} = require('../controllers/users.controller');

const router = express.Router();

router.get('/', getAllUsers);

router.get('/:id', getUserById);

router.post('/', createNewUser);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

module.exports = { usersRouter: router };
