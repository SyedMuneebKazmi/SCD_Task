const express = require('express');
const { setReleaseNotification, getUserNotifications, markNotificationAsRead } = require('../controllers/notificationController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

// Set a notification for upcoming releases
router.post('/set-release', protect, setReleaseNotification);

// Get all notifications for a user
router.get('/', protect, getUserNotifications);

// Mark a notification as read
router.put('/:notificationId/read', protect, markNotificationAsRead);

module.exports = router;
