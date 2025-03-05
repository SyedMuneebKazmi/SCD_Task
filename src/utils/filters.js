// filters.js

// Filter movies by release year range
exports.filterByReleaseYear = (query, Movie) => {
    if (query.yearStart && query.yearEnd) {
      return Movie.find({
        releaseDate: { $gte: new Date(query.yearStart), $lte: new Date(query.yearEnd) }
      });
    }
    return Movie.find();
  };
  
  // Filter by rating range
  exports.filterByRating = (query, Movie) => {
    if (query.ratingMin && query.ratingMax) {
      return Movie.find({
        averageRating: { $gte: query.ratingMin, $lte: query.ratingMax }
      });
    }
    return Movie.find();
  };
  
  // Filter by country or language
  exports.filterByCountryLanguage = (query, Movie) => {
    if (query.country) {
      return Movie.find({ country: query.country });
    }
    if (query.language) {
      return Movie.find({ language: query.language });
    }
    return Movie.find();
  };
  
  // Filter by genre
  exports.filterByGenre = (query, Movie) => {
    if (query.genre) {
      return Movie.find({ genre: { $in: query.genre.split(',') } });
    }
    return Movie.find();
  };
  
  // Advanced filtering (keywords, decade, etc.)
  exports.advancedFiltering = (query, Movie) => {
    let filterQuery = {};
  
    // Filter by decade
    if (query.decade) {
      const startYear = parseInt(query.decade) * 10;
      filterQuery.releaseDate = { $gte: new Date(startYear, 0, 1), $lt: new Date(startYear + 10, 0, 1) };
    }
  
    // Filter by 'based on a true story' or other keywords
    if (query.keywords) {
      filterQuery.synopsis = { $regex: query.keywords, $options: 'i' };
    }
  
    return Movie.find(filterQuery);
  };
  