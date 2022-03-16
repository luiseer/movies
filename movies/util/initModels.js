const {Actors} = require('../models/actors.model')
const {User} = require('../models/user.model')
const {Movie} = require('../models/movies.models')
const {Review} = require('../models/reviews.model')
const {ActorMovies} = require('../models/actorMovies.model')

const initModels = () => {
  User.hasMany(Review);
  Review.belongsTo(User);

  Movie.hasMany(Review)
  Review.belongsTo(Movie)
  
  Movie.hasMany(Actors);
  Actors.belongsTo(Movie);

  Actors.hasMany(Movie)
  Movie.belongsTo(Actors)
}

module.exports = {initModels}