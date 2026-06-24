const express = require('express');
const { protect } = require('../middleware/auth');
const { agentRateLimit } = require('../middleware/agentRateLimit');
const {
  delegateTask,
  getTaskStatus,
  listUserTasks
} = require('../controllers/agentController');

const router = express.Router();

router.post('/delegate', protect, agentRateLimit, delegateTask);
router.get('/tasks', protect, agentRateLimit, listUserTasks);
router.get('/tasks/:taskId', protect, agentRateLimit, getTaskStatus);

module.exports = router;
