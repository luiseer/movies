const express = require('express');
const { validateSession, roleUserAdmin } = require('../middlewares/auth.middleware');

const {
  getAllReview,
  getReviewById,
  createReview,
  upDataReview,
  deleteReview
} = require('../controllers/review.controller');

const router = express.Router();

router.use(validateSession);

router.route('/').get(getAllReview).post(createReview);
router
  .route('/:id')
  .get(getReviewById)
  .patch(roleUserAdmin, upDataReview)
  .delete(roleUserAdmin, deleteReview);

module.exports = { reviewsRouter: router };