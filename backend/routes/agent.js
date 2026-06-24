const express = require('express');
const { protect } = require('../middleware/auth');
const { agentRateLimit } = require('../middleware/agentRateLimit');
const {
  delegateTask,
  getTaskStatus,
  listUserTasks
} = require('../controllers/agentController');

const router = express.Router();

router.use(protect);
router.use(agentRateLimit);
router.post('/delegate', delegateTask);
router.get('/tasks', listUserTasks);
router.get('/tasks/:taskId', getTaskStatus);

module.exports = router;
