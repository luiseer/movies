const { Actors } = require('../models/actors.model');
const { User } = require('../models/user.model');
const { Movie } = require('../models/movies.models');
const { Review } = require('../models/reviews.model');
const { ActorMovies } = require('../models/actorMovies.model');

const initModels = () => {
  
  Movie.belongsToMany(Actors, { through: ActorMovies });
  Actors.belongsToMany(Movie, { through: ActorMovies });

  Movie.hasMany(Review);
  Review.belongsTo(Movie);

  User.hasMany(Review);
  Review.belongsTo(User);
};

module.exports = { initModels };
