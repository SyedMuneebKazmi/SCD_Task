const mongoose = require('mongoose');

const movieStatSchema = new mongoose.Schema({
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  viewCount: { type: Number, default: 0 },
  ratingCount: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
});

module.exports = mongoose.model('MovieStat', movieStatSchema);
