import { DataTypes } from 'sequelize/types';
import sequelize from '../util/db.js';

const Movie = sequelize.define('movie', {
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
  description: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  rating: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  duration: {
    type: DataTypes.TIME,
    allowNull: false
  },
  imgUrl:{
      type: DataTypes.STRING(100),
      allowNull: false
  },
  gener:{
      type: DataTypes.STRING(50),
      allowNull: false
  },
  status:{
      type: DataTypes.STRING(20),
      allowNull: false,
      default: 'active'
  }
});

export default Movie
