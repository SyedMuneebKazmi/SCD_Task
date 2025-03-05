const Movie = require('../models/Movie');
const { filterByReleaseYear, filterByRating, filterByCountryLanguage, filterByGenre, advancedFiltering } = require('../utils/filters');

// Search for movies by title, genre, director, or actor
exports.searchMovies = async (req, res) => {
  const { title, genre, director, actors, page = 1, limit = 10 } = req.query;
  
  let filter = {};
  
  if (title) filter.title = { $regex: title, $options: 'i' };
  if (genre) filter.genre = { $in: genre.split(',') };
  if (director) filter.director = { $regex: director, $options: 'i' };
  if (actors) filter.cast = { $regex: actors, $options: 'i' };
  
  try {
    const movies = await Movie.find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ releaseDate: -1 }); // Sort by most recent release
  
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Advanced filtering with multiple criteria
exports.advancedFilterMovies = async (req, res) => {
  const query = req.query;

  try {
    let movies = await filterByReleaseYear(query, Movie);
    movies = await filterByRating(query, movies);
    movies = await filterByCountryLanguage(query, movies);
    movies = await filterByGenre(query, movies);
    movies = await advancedFiltering(query, movies);

    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Top Movies of the Month
exports.getTopMoviesOfTheMonth = async (req, res) => {
  try {
    const topMovies = await Movie.find()
      .sort({ averageRating: -1 })
      .limit(10);

    res.status(200).json(topMovies);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Top 10 Movies by Genre
exports.getTopMoviesByGenre = async (req, res) => {
  const { genre } = req.params;
  
  try {
    const topMovies = await Movie.find({ genre: { $in: [genre] } })
      .sort({ averageRating: -1 })
      .limit(10);

    res.status(200).json(topMovies);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
