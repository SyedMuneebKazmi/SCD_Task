const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  isPublic: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('List', listSchema);
