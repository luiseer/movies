const { app } = require('./app');

// Utils
const { sequelize } = require('./util/database');

sequelize
  .authenticate({ force: true })
  .then(() => console.log('Database authenticated'))
  .catch((err) => console.log(err));

sequelize
  .sync({ force: true })
  .then(() => console.log('Database Sync...'))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Express app running on port: ${PORT}`);
});
