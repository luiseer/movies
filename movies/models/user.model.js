const { DataTypes } = require('sequelize');
const { sequelize } = require('../util/database');

const User = sequelize.define('user', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  role: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: 'user'
  },
  status: {
    type: DataTypes.STRING(20),
    defaultValue: 'active',
    allowNull: false
  }
});

module.exports = { User };
