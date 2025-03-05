const express = require('express');
const {
  createList,
  getLists,
  toggleFollowList,
  getUserWatchlist,
  toggleWatchlistMovie
} = require('../controllers/listController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

// Create a new custom list
router.post('/', protect, createList);

// Get all public lists
router.get('/', getLists);

// Follow or unfollow a list
router.post('/:listId/follow', protect, toggleFollowList);

// Get the user's watchlist
router.get('/watchlist', protect, getUserWatchlist);

// Add or remove a movie from the watchlist
router.post('/watchlist/:movieId', protect, toggleWatchlistMovie);

module.exports = router;
