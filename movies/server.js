import app from './app.js';
import sequelize from './util/db.js';


sequelize
  .authenticate()
  .then(console.log('database up..'))
  .catch((err) => console.log(err));

sequelize
  .sync()
  .then(console.log(' database sync..'))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`app run on port: ${PORT}`);
});
