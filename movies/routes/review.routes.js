const express = require ('express')

const {
    getAllReview,
    getReviewById,
    createReview,
    upDataReview,
    deleteReview

} = require('../controllers/review.controler')

const router = express.Router()

router.route('/').get(getAllReview).post(createReview)
router.route('/:id').get(getReviewById).patch(upDataReview).delete(deleteReview)

module.exports = {reviewsRouter: router}