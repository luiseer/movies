const express = require('express');

const { validateSession, roleUserAdmin } = require('../middlewares/auth.middleware');
const { body} = require('express-validator')

const { upload } = require ('../util/multer') 

const {
  getAllActors,
  getActorById,
  createNewActor,
  updateActor,
  deleteActor
} = require('../controllers/actors.controller');




const router = express.Router();

router.use(validateSession);

router
  .route('/')
  .get(getAllActors)
  .post(roleUserAdmin, createNewActor);

router
  .route('/:id')
  .get(getActorById)
  .delete(roleUserAdmin, deleteActor)
  .patch(roleUserAdmin, updateActor);

module.exports = { actorsRouter: router };