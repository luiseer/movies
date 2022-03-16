import { DataTypes } from 'sequelize/types';
import sequelize from '../util/db.js';

const ActorMovies = sequelize.define('user', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false
  },
  actorId:{
      type: DataTypes.INTEGER,
      allowNull: false
  },
  movieId:{
      type: DataTypes.INTEGER,
      allowNull: false
  }
});

export default ActorMovies
