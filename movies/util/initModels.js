const { ActorMovies } = require("../models/actorMovies.model");
const { Actors } = require("../models/actors.model");
const { Movie } = require("../models/movies.models");
const { Review } = require("../models/reviews.model");
const { User } = require("../models/user.model");


const initModels = () => {

  User.hasMany(Review);
  Review.belongsTo(User);

  Movie.hasMany(Review);
  Review.belongsTo(Movie);

  Movie.hasMany(Actors);
  Actors.belongsTo(Movie);
};

module.exports = { initModels };
