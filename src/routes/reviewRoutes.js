const express = require('express');
const {
  addOrUpdateReview,
  getMovieReviews,
  getReviewHighlights
} = require('../controllers/reviewController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

// Add or update a review
router.post('/:movieId', protect, addOrUpdateReview);

// Get reviews for a movie
router.get('/:movieId', getMovieReviews);

// Get review highlights for a movie
router.get('/:movieId/highlights', getReviewHighlights);

module.exports = router;
