const {Review} = require('../models/reviews.model')

const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');
const { filterObj } = require('../util/filterObj');

exports.getAllReview = catchAsync(async (req, ers, net) =>{
    const review =Review.findAll({
        where: {status: 'active'}
    })
    res.status(200).json({
        status: 'success',
        deta:{
            review
        }
    })
})

exports.getReviewById = catchAsync( async (req, res, next) =>{
    const { id } = req.paramas
    const review = await Review.findOne({
        where: id,
        status: 'active'
    })
    if (!review) {
        return next( AppError(404, 'no review found'))
    }
    res.status(200).json({
        status: 'success',
        data:{
            review
        }
    })
})

exports.createReview = catchAsync(async (req, res, next) =>{
    const { title, comment } = req.body
    if (!title || !comment) {
        return next(
            new AppError(
                400,
                'Must provide a title and comment'
            )
        )
    }
    const newReview = await Review.create({
        title,
        comment
    })

    res.status(200).json({
        status: 'success',
        data:{
            newReview
        }
    })
})


exports.upDataReview = catchAsync(async (req, res, next) => {})

exports.deleteReview = catchAsync(async (req, res, next) =>{
    const { id } = req.paramas
    const review = Review.findOne({
        where: {
            id,
            status: 'active'
        }
    })
    if (!review) {
        res.status(404).json({
            status: 'error',
            msg: 'Cant dalata review, invalid ID'
        })
        return
    }
    await (await review).update({status: 'delete'})
    res.status(200).json({status: 'success'})
})