const express = require('express');
const rateLimit = require('express-rate-limit');
const { protect } = require('../middleware/auth');
const {
  delegateTask,
  getTaskStatus,
  listUserTasks
} = require('../controllers/agentController');

const router = express.Router();
const agentRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: 'Too many agent task requests. Please try again shortly.'
  }
});

router.post('/delegate', agentRateLimiter, protect, delegateTask);
router.get('/tasks', agentRateLimiter, protect, listUserTasks);
router.get('/tasks/:taskId', agentRateLimiter, protect, getTaskStatus);

module.exports = router;
