const Review = require('../models/Review');
const Movie = require('../models/Movie');

// Add or update a review for a movie
exports.addOrUpdateReview = async (req, res) => {
  const { movieId } = req.params;
  const { rating, text } = req.body;

  try {
    // Check if user has already reviewed this movie
    let review = await Review.findOne({ user: req.user.id, movie: movieId });

    if (review) {
      // Update existing review
      review.rating = rating;
      review.text = text;
      review.updatedAt = Date.now();
      await review.save();

      res.status(200).json({ message: 'Review updated successfully', review });
    } else {
      // Create a new review
      review = new Review({
        user: req.user.id,
        movie: movieId,
        rating,
        text
      });

      await review.save();

      // Update movie's average rating and review count
      const reviews = await Review.find({ movie: movieId });
      const averageRating = reviews.reduce((acc, cur) => acc + cur.rating, 0) / reviews.length;

      await Movie.findByIdAndUpdate(movieId, {
        averageRating,
        reviewCount: reviews.length
      });

      res.status(201).json({ message: 'Review added successfully', review });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get reviews for a movie
exports.getMovieReviews = async (req, res) => {
  const { movieId } = req.params;

  try {
    const reviews = await Review.find({ movie: movieId })
      .populate('user', 'username')
      .sort({ createdAt: -1 });

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get review highlights for a movie
exports.getReviewHighlights = async (req, res) => {
  const { movieId } = req.params;

  try {
    const topReviews = await Review.find({ movie: movieId })
      .sort({ likes: -1, rating: -1 })
      .limit(3)
      .populate('user', 'username');

    res.status(200).json(topReviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
