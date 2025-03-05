const Discussion = require('../models/Discussion');
const Movie = require('../models/Movie');

// Create a new discussion thread
exports.createDiscussion = async (req, res) => {
  const { title, content, movieId } = req.body;

  try {
    const movie = await Movie.findById(movieId);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    const discussion = new Discussion({
      title,
      content,
      movie: movieId,
      creator: req.user.id,
    });

    await discussion.save();
    res.status(201).json({ message: 'Discussion created successfully', discussion });
  } catch (error) {
    res.status(500).json({ message: 'Error creating discussion', error });
  }
};

// Reply to a discussion thread
exports.replyToDiscussion = async (req, res) => {
  const { discussionId, content } = req.body;

  try {
    const discussion = await Discussion.findById(discussionId);
    if (!discussion) return res.status(404).json({ message: 'Discussion not found' });

    discussion.replies.push({
      user: req.user.id,
      content,
    });

    await discussion.save();
    res.status(201).json({ message: 'Reply added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding reply', error });
  }
};

// Get all discussions for a movie
exports.getMovieDiscussions = async (req, res) => {
  const { movieId } = req.params;

  try {
    const discussions = await Discussion.find({ movie: movieId })
      .populate('creator', 'name')
      .populate('replies.user', 'name');
    res.status(200).json(discussions);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving discussions', error });
  }
};
