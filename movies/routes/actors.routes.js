const express = require('express');
const { validateSession } = require('../middlewares/auth.middleware');

const {
  getAllActors,
  getActorById,
  createNewActor,
  updateActor,
  deleteActor
} = require('../controllers/actors.controller');

const router = express.Router();

router.use(validateSession);

router.route('/').get(getAllActors).post(createNewActor);

router.route('/:id').get(getActorById).delete(deleteActor).patch(updateActor);

module.exports = { actorsRouter: router };
