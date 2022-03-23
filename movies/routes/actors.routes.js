const express = require('express');

const {
  getAllActors,
  getActorById,
  createNewActor,
  updateActor,
  deleteActor
} = require('../controllers/actors.controller');

const router = express.Router();

router.route('/').get(getAllActors).post(createNewActor);

router
  .route('/:id')
  .get(getActorById)
  .delete(deleteActor)
  .patch(updateActor);

module.exports = { actorsRouter: router };
