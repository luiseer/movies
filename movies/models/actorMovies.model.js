const { DataTypes } = require('sequelize');
const { sequelize } = require('../util/database');

const ActorMovies = sequelize.define('actormovie', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false
  },
  actorid: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  movieid: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = { ActorMovies };
