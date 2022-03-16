import Actors from "../models/actors.model.js";
import Movie from "../models/movies.models.js";
import Review from "../models/reviews.model.js";
import User from "../models/reviews.model.js";

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