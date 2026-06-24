const Design = require('../models/Design');
const agentService = require('../services/agentService');

exports.generateDesign = async (req, res) => {
  try {
    const { designId, prompt } = req.body;

    const design = await Design.findById(designId);
    if (!design) {
      return res.status(404).json({ message: 'Design not found' });
    }

    if (design.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const task = await agentService.delegateTask(
      'design_generation',
      {
        prompt: prompt || design.customDescription,
        occasion: design.occasion,
        dressType: design.dressType,
        measurements: design.measurements
      },
      req.userId,
      design._id
    );

    res.status(202).json({
      success: true,
      message: 'Design generation delegated successfully',
      taskId: task.taskId,
      status: task.status,
      task
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
