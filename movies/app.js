const express = require('express');
const { actorsRouter } = require('./routes/actors.routes');
const { moviesRouter } = require('./routes/movies.routes');
const { usersRouter } = require('./routes/users.routes');
const { reviewsRouter } = require('./routes/review.routes');
const app = express();
app.use(express.json());

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/actors', actorsRouter);
app.use('/api/v1/movies', moviesRouter);
app.use('/api/v1/reviews', reviewsRouter);

module.exports = { app };
