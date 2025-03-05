const express = require('express');
const {
  getPersonalizedRecommendations,
  getSimilarTitles,
  getTrendingAndTopRatedMovies
} = require('../controllers/recommendationController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

// Personalized recommendations for the logged-in user
router.get('/personalized', protect, getPersonalizedRecommendations);

// Get similar titles for a specific movie
router.get('/similar/:movieId', getSimilarTitles);

// Get trending and top-rated movies
router.get('/trending-top-rated', getTrendingAndTopRatedMovies);

module.exports = router;
