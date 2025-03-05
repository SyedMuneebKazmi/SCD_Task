const Movie = require('../models/Movie');
const Review = require('../models/Review');
const User = require('../models/User');
const { calculateSimilarityScore } = require('../utils/similarity');

// Personalized movie recommendations
exports.getPersonalizedRecommendations = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Fetch movies based on user's favorite genres and ratings
    const recommendedMovies = await Movie.find({
      genre: { $in: user.preferences }
    })
      .sort({ averageRating: -1 })
      .limit(10);

    res.status(200).json(recommendedMovies);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Similar titles for a movie
exports.getSimilarTitles = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.movieId);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    const similarMovies = await Movie.find({
      $or: [
        { genre: { $in: movie.genre } },
        { director: movie.director },
      ],
      _id: { $ne: movie._id }
    })
      .sort({ averageRating: -1 })
      .limit(5);

    res.status(200).json(similarMovies);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Trending and top-rated movies
exports.getTrendingAndTopRatedMovies = async (req, res) => {
  try {
    const trendingMovies = await Movie.find()
      .sort({ reviewCount: -1, averageRating: -1 })
      .limit(10);

    const topRatedMovies = await Movie.find()
      .sort({ averageRating: -1 })
      .limit(10);

    res.status(200).json({ trendingMovies, topRatedMovies });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
