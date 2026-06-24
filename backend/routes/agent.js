const express = require('express');
const { protect } = require('../middleware/auth');
const {
  delegateTask,
  getTaskStatus,
  listUserTasks
} = require('../controllers/agentController');

const router = express.Router();

router.use(protect);
router.post('/delegate', delegateTask);
router.get('/tasks', listUserTasks);
router.get('/tasks/:taskId', getTaskStatus);

module.exports = router;
