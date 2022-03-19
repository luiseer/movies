const express = require('express');

const {
  getAllActors,
  getActorById,
  createNewActor,
  updateActor,
  deleteActor
} = require('../controllers/actors.controller');

const router = express.Router();

router.get('/', getAllActors);

router.route('/:id').get(getActorById).delete(deleteActor);

router.post('/', createNewActor);

router.patch('/:id', updateActor);

module.exports = { actorsRouter: router };
