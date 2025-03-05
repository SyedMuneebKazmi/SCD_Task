const express = require('express');
const { createDiscussion, replyToDiscussion, getMovieDiscussions } = require('../controllers/communityController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

// Create a discussion thread
router.post('/create', protect, createDiscussion);

// Reply to a discussion thread
router.post('/reply', protect, replyToDiscussion);

// Get all discussions for a movie
router.get('/:movieId/discussions', getMovieDiscussions);

module.exports = router;
