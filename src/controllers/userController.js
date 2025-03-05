const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Register a new user
exports.registerUser = async (req, res) => {
  const { username, email, password, preferences } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      preferences,
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token, user: { id: newUser._id, username, email } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user profile
exports.getUserProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  // Update user profile
  exports.updateUserProfile = async (req, res) => {
    const { username, preferences } = req.body;
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        { username, preferences },
        { new: true, runValidators: true }
      ).select('-password');
  
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };

// Add a movie to the wishlist
exports.addToWishlist = async (req, res) => {
    const { movieId } = req.body;
  
    try {
      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      if (user.watchlist.includes(movieId)) {
        return res.status(400).json({ message: 'Movie already in wishlist' });
      }
  
      user.watchlist.push(movieId);
      await user.save();
  
      res.status(200).json({ message: 'Movie added to wishlist', watchlist: user.watchlist });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  // Remove a movie from the wishlist
  exports.removeFromWishlist = async (req, res) => {
    const { movieId } = req.body;
  
    try {
      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      user.watchlist = user.watchlist.filter(id => id.toString() !== movieId);
      await user.save();
  
      res.status(200).json({ message: 'Movie removed from wishlist', watchlist: user.watchlist });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  