const { app } = require('./app');
const {initModels} = require('./util/initModels')
const {Actors} = require('./models/actors.model')
const {User} = require('./models/user.model')
const {Movie} = require('./models/movies.models')
const {Review} = require('./models/reviews.model')
const {ActorMovies} = require('./models/actorMovies.model')



// Utils
const { sequelize } = require('./util/database');

sequelize
  .authenticate({ force: true })
  .then(() => console.log('Database authenticated'))
  .catch((err) => console.log(err));

// initModels()

sequelize
  .sync()
  .then(() => console.log('Database Sync...'))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 4000;


app.listen(PORT, () => {
  console.log(`Express app running on port: ${PORT}`);
});
