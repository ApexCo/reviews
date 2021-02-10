const compression = require('compression');
const express = require('express');
const path = require('path');

const getReviews = require('./controllers/ReviewsController.js');

const app = express();

app.use(compression());
app.use('/:id', express.static(path.join(__dirname, '../public')));
app.use('/:id/bundle', express.static(path.join(__dirname, '../public/main.js')));

app.get('/api/reviews/:id', getReviews);

module.exports = app;
