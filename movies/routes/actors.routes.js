const  express = require('express')

const {
    getAllActors,
    getActorById,
    createNewActor,
    updateActor,
    deleteActor
} = require('../controllers/actors.controller')

const router = express.Router()

router.get('/', getAllActors)
router.get('/:id', getActorById)
router.post('/', createNewActor)
router.put('/:id', updateActor)
router.delete('/:id', deleteActor)

module.exports = { actorsRouter: router };