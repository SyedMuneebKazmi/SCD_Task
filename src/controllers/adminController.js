const Movie = require('../models/Movie');
const Review = require('../models/Review');
const MovieStat = require('../models/MovieStat');

// Admin: Add a new movie to the database
exports.addMovie = async (req, res) => {
  const { title, genre, director, cast, releaseDate, runtime, synopsis, rating, coverPhoto } = req.body;
  
  try {
    const newMovie = new Movie({
      title,
      genre,
      director,
      cast,
      releaseDate,
      runtime,
      synopsis,
      rating,
      coverPhoto,
    });
    await newMovie.save();
    res.status(201).json({ message: 'Movie added successfully', newMovie });
  } catch (error) {
    res.status(500).json({ message: 'Error adding movie', error });
  }
};

// Admin: Update an existing movie
exports.updateMovie = async (req, res) => {
  const { movieId } = req.params;
  const updates = req.body;

  try {
    const updatedMovie = await Movie.findByIdAndUpdate(movieId, updates, { new: true });
    if (!updatedMovie) return res.status(404).json({ message: 'Movie not found' });

    res.status(200).json({ message: 'Movie updated successfully', updatedMovie });
  } catch (error) {
    res.status(500).json({ message: 'Error updating movie', error });
  }
};

// Admin: Delete a movie from the database
exports.deleteMovie = async (req, res) => {
  const { movieId } = req.params;

  try {
    const deletedMovie = await Movie.findByIdAndDelete(movieId);
    if (!deletedMovie) return res.status(404).json({ message: 'Movie not found' });

    res.status(200).json({ message: 'Movie deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting movie', error });
  }
};

// Admin: Moderate user reviews (approve or delete)
exports.moderateReview = async (req, res) => {
  const { reviewId, action } = req.body;  // action: 'approve' or 'delete'

  try {
    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    if (action === 'approve') {
      review.status = 'approved';  // Update review status to approved
      await review.save();
      return res.status(200).json({ message: 'Review approved', review });
    }

    if (action === 'delete') {
      await review.remove();
      return res.status(200).json({ message: 'Review deleted' });
    }

    res.status(400).json({ message: 'Invalid action' });
  } catch (error) {
    res.status(500).json({ message: 'Error moderating review', error });
  }
};

// Admin: View statistics (e.g., most popular movies, trending genres)
exports.getStatistics = async (req, res) => {
  try {
    const mostPopularMovies = await MovieStat.find({}).sort({ viewCount: -1 }).limit(5);
    const trendingGenres = await Movie.aggregate([
      { $unwind: '$genre' },
      { $group: { _id: '$genre', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);
    const mostSearchedActors = await Movie.aggregate([
      { $unwind: '$cast' },
      { $group: { _id: '$cast', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    res.status(200).json({
      mostPopularMovies,
      trendingGenres,
      mostSearchedActors,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving statistics', error });
  }
};
