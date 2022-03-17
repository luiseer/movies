const { catchAsync } = require('../util/catchAsync');

 exports.getAllUser = catchAsync (async (req, res, next) =>{
    res.send('hello')
})
 exports.getUserById = catchAsync ( async (req, res, next) =>{
    res.send('hello')
})
 exports.createNewUser = catchAsync ( async (req, res, next) =>{
    res.send('hello')
})
 exports.updateUser = catchAsync ( async (req, res, next) =>{
    res.send('hello')
})
 exports.deleteUser = catchAsync ( async (req, res, next) =>{
    res.send('hello')
})
