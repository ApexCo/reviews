const get = require('../models/ReviewsModel.js');

const getReviews = (req, res) => (
  get(req.params.id, (err, reviews) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(reviews);
    }
  })
);

module.exports = getReviews;
