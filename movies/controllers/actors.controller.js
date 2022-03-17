const { catchAsync } = require('../util/catchAsync');

exports.getAllActors = catchAsync(async (req, res, next) => {
  res.send('hello');
});
exports.getActorById = catchAsync(async (req, res, next) => {
  res.send('hello');
});
exports.createNewActor = catchAsync(async (req, res, next) => {
  res.send('hello');
});
exports.updateActor = catchAsync(async (req, res, next) => {
  res.send('hello');
});
exports.deleteActor = catchAsync(async (req, res, next) => {
  res.send('hello');
});
