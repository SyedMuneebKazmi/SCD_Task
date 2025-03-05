const mongoose = require('mongoose');

const awardSchema = new mongoose.Schema({
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
  actor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Optional, for actor-specific awards
  awardName: { type: String, required: true },
  category: { type: String, required: true },
  year: { type: Number, required: true },
  result: { type: String, enum: ['Won', 'Nomination'], required: true },
});

module.exports = mongoose.model('Award', awardSchema);
