const express = require('express');
const { protect } = require('../middleware/auth');
const { agentRateLimit } = require('../middleware/agentRateLimit');
const {
  delegateTask,
  getTaskStatus,
  listUserTasks
} = require('../controllers/agentController');

const router = express.Router();

router.post('/delegate', agentRateLimit, protect, delegateTask);
router.get('/tasks', agentRateLimit, protect, listUserTasks);
router.get('/tasks/:taskId', agentRateLimit, protect, getTaskStatus);

module.exports = router;
