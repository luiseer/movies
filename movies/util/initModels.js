const { Actors } = require('../models/actors.model');
const { User } = require('../models/user.model');
const { Movie } = require('../models/movies.models');
const { Review } = require('../models/reviews.model');
const { ActorMovies } = require('../models/actorMovies.model');

const initModels = () => {
  User.hasMany(Review);
  Review.belongsTo(User);

  Movie.hasMany(Review);
  Review.belongsTo(Movie);

  Movie.belongsToMany(Actors, { through: ActorMovies });
  Actors.belongsToMany(Movie, { through: ActorMovies });
};

module.exports = { initModels };