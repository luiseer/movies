const { DataTypes } = require('sequelize');
const { sequelize } = require('../util/database');

const Actors = sequelize.define('actor', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  country: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  awards: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  profilePicUrl: {
    type: DataTypes.STRING(12),
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING(50),
    allowNull: false,
    default: 'active'
  }
});

module.exports = { Actors };
