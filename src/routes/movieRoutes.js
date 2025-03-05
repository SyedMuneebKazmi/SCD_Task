const express = require('express');
const { searchMovies, advancedFilterMovies, getTopMoviesOfTheMonth, getTopMoviesByGenre } = require('../controllers/movieController');
const router = express.Router();

// Search for movies by title, genre, director, or actors
router.get('/search', searchMovies);

// Advanced filtering for movies (release year, rating, country, etc.)
router.get('/filter', advancedFilterMovies);

// Top Movies of the Month (e.g., trending)
router.get('/top-month', getTopMoviesOfTheMonth);

// Get top 10 movies by genre
router.get('/top-genre/:genre', getTopMoviesByGenre);

module.exports = router;
