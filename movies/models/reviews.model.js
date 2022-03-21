const { DataTypes } = require('sequelize');
const { sequelize } = require('../util/database');

const Review = sequelize.define('review', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  comment: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  userid: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  movieid: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  status: {
    type: DataTypes.STRING(10),
    defaultValue: 'active',
    allowNull: false
  }
});

module.exports = { Review };
