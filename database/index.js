const mongoose = require('mongoose');

let string = process.env.CONNECTIONSTRING;

if (process.env.NODE_ENV !== 'production') {
  string = 'mongodb://localhost/fec';
}

mongoose.connect(string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const reviewsSchema = new mongoose.Schema({
  _id: Number,
  averageRating: Number,
  reviewCount: Number,
  ratings: Array,
  reviews: Array,
});

const Review = mongoose.model('Review', reviewsSchema);

module.exports = {
  connection: mongoose.connection,
  Review,
};
