const { catchAsync } = require('../util/catchAsync');

exports.getAllMovie = catchAsync (async (req, res, next) =>{
    res.send('hello')
})
exports.getMovieById = catchAsync (async (req, res, next) =>{
    res.send('hello')
})
exports.createNewMovie = catchAsync (async (req, res, next) =>{
    res.send('hello')
})
exports.updateMovie = catchAsync (async (req, res, next) =>{
    res.send('hello')
})
exports.deleteMovie = catchAsync (async (req, res, next) =>{
    res.send('hello')
})