const BoxOffice = require('../models/BoxOffice');
const Award = require('../models/Award');
const Movie = require('../models/Movie');

// Add or update box office information for a movie
exports.addBoxOfficeInfo = async (req, res) => {
  const { movieId, openingWeekend, totalEarnings, internationalRevenue, domesticRevenue, releaseDate } = req.body;

  try {
    const movie = await Movie.findById(movieId);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    const boxOfficeData = new BoxOffice({
      movie: movieId,
      openingWeekend,
      totalEarnings,
      internationalRevenue,
      domesticRevenue,
      releaseDate,
    });

    await boxOfficeData.save();
    res.status(201).json({ message: 'Box office information added successfully', data: boxOfficeData });
  } catch (error) {
    res.status(500).json({ message: 'Error adding box office information', error });
  }
};

// Add an award or nomination
exports.addAward = async (req, res) => {
  const { movieId, actorId, awardName, category, year, result } = req.body;

  try {
    const movie = await Movie.findById(movieId);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    const award = new Award({
      movie: movieId,
      actor: actorId,
      awardName,
      category,
      year,
      result,
    });

    await award.save();
    res.status(201).json({ message: 'Award added successfully', data: award });
  } catch (error) {
    res.status(500).json({ message: 'Error adding award', error });
  }
};

// Get box office information for a movie
exports.getBoxOfficeInfo = async (req, res) => {
  const { movieId } = req.params;

  try {
    const boxOfficeData = await BoxOffice.findOne({ movie: movieId });
    if (!boxOfficeData) return res.status(404).json({ message: 'Box office data not found' });

    res.status(200).json(boxOfficeData);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving box office information', error });
  }
};

// Get awards for a movie or actor
exports.getAwards = async (req, res) => {
  const { movieId } = req.params;

  try {
    const awards = await Award.find({ movie: movieId }).populate('actor', 'name');
    res.status(200).json(awards);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving awards', error });
  }
};
