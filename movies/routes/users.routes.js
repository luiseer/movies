const express = require('express');

const {
    getAllUser,
    getUserById,
    createNewUser,
    updateUser,
    deleteUser
} = require('../controllers/users.controller');

const router = express.Router()

router.get('/', getAllUser)

router.get('/:id', getUserById)

router.post('/', createNewUser)

router.put('/:id', updateUser)

router.delete('/:id', deleteUser)

module.exports = {usersRouter: router}