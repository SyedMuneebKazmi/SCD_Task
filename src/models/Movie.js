const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: [String],
  director: { type: mongoose.Schema.Types.ObjectId, ref: 'CrewMember' },
  cast: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Actor' }],
  releaseDate: { type: Date },
  runtime: { type: Number }, // In minutes
  country: { type: String },
  language: { type: String },
  synopsis: { type: String },
  averageRating: { type: Number, default: 0 },
  coverPhoto: { type: String }, // URL to the image
  trivia: [String],
  goofs: [String],
  soundtrackInfo: [String],
  ageRating: { type: String }, // e.g., "PG-13", "R"
  parentalGuidance: { type: String },
  averageRating: { type: Number, default: 0 },
reviewCount: { type: Number, default: 0 }

});

module.exports = mongoose.model('Movie', movieSchema);
