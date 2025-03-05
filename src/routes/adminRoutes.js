const express = require('express');
const { addMovie, updateMovie, deleteMovie, moderateReview, getStatistics } = require('../controllers/adminController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');
const router = express.Router();

// Movie Management Routes (Admin only)
router.post('/movie', protect, adminOnly, addMovie);          // Add a new movie
router.put('/movie/:movieId', protect, adminOnly, updateMovie); // Update a movie
router.delete('/movie/:movieId', protect, adminOnly, deleteMovie); // Delete a movie

// Review Moderation (Admin only)
router.post('/review/moderate', protect, adminOnly, moderateReview); // Moderate (approve or delete) reviews

// Admin: View site statistics (Most Popular, Trending Genres, Most Searched Actors)
router.get('/statistics', protect, adminOnly, getStatistics);

module.exports = router;
