const mongoose = require('mongoose');

const actorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  biography: { type: String },
  filmography: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
  awards: [String],
  photos: [String] // URLs to photos
});

module.exports = mongoose.model('Actor', actorSchema);
