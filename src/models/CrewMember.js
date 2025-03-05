const mongoose = require('mongoose');

const crewMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  biography: { type: String },
  role: { type: String }, // e.g., "Director"
  filmography: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
  awards: [String],
  photos: [String] // URLs to photos
});

module.exports = mongoose.model('CrewMember', crewMemberSchema);
