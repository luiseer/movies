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
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  awards: {
    type: DataTypes.STRING(100),
    allowNull: false,
    defaultValue: 'Oscar'
  },
  profilePicUrl: {
    type: DataTypes.STRING(120),
    allowNull: false
  },
  status: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: 'active'
  }
});

module.exports = { Actors };
