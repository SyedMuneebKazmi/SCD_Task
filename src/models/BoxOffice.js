const mongoose = require('mongoose');

const boxOfficeSchema = new mongoose.Schema({
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  openingWeekend: { type: Number, default: 0 },
  totalEarnings: { type: Number, default: 0 },
  internationalRevenue: { type: Number, default: 0 },
  domesticRevenue: { type: Number, default: 0 },
  releaseDate: { type: Date },
});

module.exports = mongoose.model('BoxOffice', boxOfficeSchema);
