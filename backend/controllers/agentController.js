const Design = require('../models/Design');
const agentService = require('../services/agentService');

const SUPPORTED_TASK_TYPES = ['design_generation', 'style_recommendation', 'fabric_suggestion'];

exports.delegateTask = async (req, res) => {
  try {
    const { type, payload = {}, designId = null } = req.body;

    if (!type) {
      return res.status(400).json({ message: 'Task type is required' });
    }

    if (!SUPPORTED_TASK_TYPES.includes(type)) {
      return res.status(400).json({ message: 'Unsupported task type' });
    }

    let design = null;

    if (designId) {
      design = await Design.findById(designId);

      if (!design) {
        return res.status(404).json({ message: 'Design not found' });
      }

      if (design.userId.toString() !== req.userId) {
        return res.status(403).json({ message: 'Not authorized' });
      }
    }

    const taskPayload = type === 'design_generation' && design
      ? {
          prompt: payload.prompt || design.customDescription,
          occasion: payload.occasion || design.occasion,
          dressType: payload.dressType || design.dressType,
          measurements: payload.measurements || design.measurements
        }
      : payload;

    const task = await agentService.delegateTask(type, taskPayload, req.userId, designId);

    res.status(202).json({
      success: true,
      message: 'Task delegated successfully',
      taskId: task.taskId,
      status: task.status,
      task
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTaskStatus = async (req, res) => {
  try {
    const task = await agentService.getTaskStatus(req.params.taskId, req.userId);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({
      success: true,
      task
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.listUserTasks = async (req, res) => {
  try {
    const tasks = await agentService.listUserTasks(req.userId);

    res.json({
      success: true,
      tasks
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
