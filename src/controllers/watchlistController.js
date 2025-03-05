const List = require('../models/List');
const User = require('../models/User');

// Create a new custom list
exports.createList = async (req, res) => {
  try {
    const { title, description, movies, isPublic } = req.body;

    const newList = new List({
      title,
      description,
      movies,
      createdBy: req.user.id,
      isPublic
    });

    await newList.save();
    res.status(201).json({ message: 'List created successfully', list: newList });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all public lists or user-specific lists
exports.getLists = async (req, res) => {
  try {
    const lists = await List.find({ isPublic: true })
      .populate('createdBy', 'username')
      .sort({ createdAt: -1 });

    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Follow or unfollow a list
exports.toggleFollowList = async (req, res) => {
  const { listId } = req.params;

  try {
    const list = await List.findById(listId);
    if (!list) return res.status(404).json({ message: 'List not found' });

    const userId = req.user.id;
    const isFollowing = list.followers.includes(userId);

    if (isFollowing) {
      // Unfollow the list
      list.followers.pull(userId);
      await list.save();
      res.status(200).json({ message: 'Unfollowed the list', list });
    } else {
      // Follow the list
      list.followers.push(userId);
      await list.save();
      res.status(200).json({ message: 'Followed the list', list });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get a user's watchlist
exports.getUserWatchlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('watchlist');
    res.status(200).json(user.watchlist);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Add or remove movies from the watchlist
exports.toggleWatchlistMovie = async (req, res) => {
  const { movieId } = req.params;

  try {
    const user = await User.findById(req.user.id);

    if (user.watchlist.includes(movieId)) {
      user.watchlist.pull(movieId);
      await user.save();
      res.status(200).json({ message: 'Removed from watchlist' });
    } else {
      user.watchlist.push(movieId);
      await user.save();
      res.status(200).json({ message: 'Added to watchlist' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
