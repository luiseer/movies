import { DataTypes } from 'sequelize/types';
import sequelize from '../util/db.js';

const Review = sequelize.define('REVIEW', {
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
    unique: true,
    allowNull: false
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING(10),
    defaultValue: 'active',
    allowNull: false
  },
  imgUrl:{
      type: DataTypes.STRING(12),
      allowNull: false
  },
  userId:{
      type: DataTypes.INTEGER,
      allowNull: dalse
  },
  movieId:{
      type: DataTypes.INTEGER,
      allowNull: dalse
  },
});

export default Review
