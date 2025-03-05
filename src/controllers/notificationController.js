const Notification = require('../models/Notification');
const User = require('../models/User');
const Movie = require('../models/Movie');
const { sendEmailNotification } = require('../utils/emailUtils');

// Set notification for upcoming releases
exports.setReleaseNotification = async (req, res) => {
  const { movieId } = req.body;
  try {
    const movie = await Movie.findById(movieId);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    const notification = new Notification({
      user: req.user.id,
      movie: movieId,
      type: 'release',
      message: `Your upcoming release: "${movie.title}" is set to release on ${movie.releaseDate}.`,
    });

    await notification.save();
    res.status(201).json({ message: 'Notification set for upcoming release' });
  } catch (error) {
    res.status(500).json({ message: 'Error setting notification', error });
  }
};

// Get all notifications for a user
exports.getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate('movie', 'title releaseDate');
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notifications', error });
  }
};

// Mark notifications as read
exports.markNotificationAsRead = async (req, res) => {
  const { notificationId } = req.params;
  try {
    const notification = await Notification.findById(notificationId);
    if (!notification) return res.status(404).json({ message: 'Notification not found' });

    notification.isRead = true;
    await notification.save();
    res.status(200).json({ message: 'Notification marked as read' });
  } catch (error) {
    res.status(500).json({ message: 'Error marking notification as read', error });
  }
};
