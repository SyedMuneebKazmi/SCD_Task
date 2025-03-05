const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    preferences: [String],
    watchlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
    isAdmin: { type: Boolean, default: false } // New field for admin role
  });
  
  module.exports = mongoose.model('User', userSchema);
  