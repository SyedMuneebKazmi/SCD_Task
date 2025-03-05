const express = require('express');
const { addBoxOfficeInfo, addAward, getBoxOfficeInfo, getAwards } = require('../controllers/boxOfficeController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

// Add or update box office information
router.post('/add-box-office', protect, addBoxOfficeInfo);

// Add an award or nomination
router.post('/add-award', protect, addAward);

// Get box office information for a movie
router.get('/:movieId/box-office', getBoxOfficeInfo);

// Get awards for a movie
router.get('/:movieId/awards', getAwards);

module.exports = router;
