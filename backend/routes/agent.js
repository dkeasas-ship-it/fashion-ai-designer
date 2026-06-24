const express = require('express');
const { protect } = require('../middleware/auth');
const { rateLimit } = require('../middleware/rateLimit');
const {
  delegateTask,
  getTaskStatus,
  listUserTasks
} = require('../controllers/agentController');

const router = express.Router();

router.post('/delegate', rateLimit, protect, delegateTask);
router.get('/tasks', rateLimit, protect, listUserTasks);
router.get('/tasks/:taskId', rateLimit, protect, getTaskStatus);

module.exports = router;
