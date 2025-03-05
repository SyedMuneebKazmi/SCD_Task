const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const errorHandler = require('./utils/errorHandler');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/movies', require('./routes/movieRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
app.use('/api/recommendations', require('./routes/recommendationRoutes'));
app.use('/api/watchlists', require('./routes/watchlistRoutes'));
app.use('/api/search', require('./routes/searchRoutes'));
app.use('/api/community', require('./routes/communityRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// Custom error handler middleware
app.use(errorHandler);

module.exports = app;
