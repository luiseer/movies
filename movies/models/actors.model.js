import { DataTypes } from 'sequelize/types';
import sequelize from '../util/db.js';

const Actors = sequelize.define('user', {
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
  profilePicUrl:{
      type: DataTypes.STRING(12),
      allowNull: false
  },
  age:{
      type: DataTypes.INTEGER,
      allowNull: false
  },
  status:{
      type: DataTypes.STRING(50),
      allowNull: false,
      default: 'active'
  }
});

export default Actors
