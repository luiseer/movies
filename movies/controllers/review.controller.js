const { Review } = require('../models/reviews.model');

const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');
const { filterObj } = require('../util/filterObj');
const { User } = require('../models/user.model');

exports.getAllReview = catchAsync(async (req, res, next) => {
  const review = await Review.findAll({
    include: [{model: User}],
    where:{
      status: 'active'
    }
  });
  res.status(200).json({
    status: 'success',
    data: {
      review
    }
  });
});

exports.getReviewById = catchAsync(async (req, res, next) => {
  const { id } = req.paramas;
  const review = await Review.findOne({
    where: id,
    status: 'active'
  });
  if (!review) {
    return next(AppError(404, 'no review found'));
  }
  res.status(200).json({
    status: 'success',
    data: {
      review
    }
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  const { id } = req.body
  const { title, comment, userid, movieid } = req.body;
  if (!title || !comment || !userid || !movieid) {
    return next(new AppError(400, 'Must provide a title and comment'));
  }
  const newReview = await Review.create({
    title,
    comment,
    userid,
    movieid
  });

  res.status(200).json({
    status: 'success',
    data: {
      newReview
    }
  });
});

exports.upDataReview = catchAsync(async (req, res, next) => {
  const { id } = req.paramas;
  const { title, comment } = req.body;
  if (!title || !comment || title.length === 0 || comment.length === 0) {
    res.status(400).json({
      status: 'error',
      mgs: 'Must provide a tltle and comment'
    });
    return;
  }

  const review = await Review.findOne({
    where: { id, status: 'active' }
  });

  if (!review) {
    res.status(404).json({
      status: 'error',
      msg: 'Cant find review invalid ID'
    });
  }

  await review.update({
    title,
    comment
  });
  res.status(204).json({
    status: 'success'
  });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  const { id } = req.paramas;
  const review = Review.findOne({
    where: {
      id,
      status: 'active'
    }
  });
  if (!review) {
    res.status(404).json({
      status: 'error',
      msg: 'Cant dalata review, invalid ID'
    });
    return;
  }
  await (await review).update({ status: 'delete' });
  res.status(200).json({ status: 'success' });
});
