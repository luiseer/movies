const express = require('express');
const { validateSession,upDateUserByUser } = require('../middlewares/auth.middleware');

const {
  getUserById,
  createNewUser,
  updateUser,
  deleteUser,
  getAllUsers,
  loginUser
} = require('../controllers/users.controller');

const router = express.Router();

router.post('/login', loginUser);
router.post('/', createNewUser);

router.use(validateSession);

router
  .route('/').get(getAllUsers);

router
  .route('/:id')
  .get(getUserById)
  .patch(upDateUserByUser, updateUser)
  .delete(deleteUser);

module.exports = { usersRouter: router };