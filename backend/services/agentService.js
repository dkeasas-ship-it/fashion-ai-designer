const { v4: uuidv4 } = require('uuid');
const AgentTask = require('../models/AgentTask');
const Design = require('../models/Design');

const generateDesignWithAI = async (prompt, occasion, dressType, measurements) => {
  try {
    const generatedImage = {
      url: `https://via.placeholder.com/512x512?text=${occasion}+${dressType}`,
      prompt,
      version: 1,
      generatedAt: new Date(),
      isSelected: false
    };

    return {
      success: true,
      designImages: [generatedImage],
      confidence: 92,
      aiModel: 'stable-diffusion-v1.5'
    };
  } catch (error) {
    throw new Error(`AI Generation failed: ${error.message}`);
  }
};

const handleDesignGeneration = async (payload, task) => {
  const result = await generateDesignWithAI(
    payload.prompt,
    payload.occasion,
    payload.dressType,
    payload.measurements
  );

  let design = null;

  if (task.designId) {
    design = await Design.findById(task.designId);

    if (!design) {
      throw new Error('Design not found for task processing');
    }

    design.designImages = result.designImages;
    design.status = 'generated';
    design.aiGeneration = {
      model: result.aiModel,
      prompt: payload.prompt || design.customDescription,
      confidence: result.confidence,
      createdAt: new Date()
    };

    await design.save();
  }

  return {
    ...result,
    design: design ? design.toObject() : null,
    message: 'Design generated successfully'
  };
};

const handleStyleRecommendation = async (payload) => ({
  success: true,
  styleSuggestions: [
    `Elegant ${payload.occasion || 'special event'} silhouette with refined embellishments`,
    `Modern ${payload.dressType || 'dress'} styling with balanced layering`,
    'Minimal luxury accents with tailored fit recommendations'
  ],
  generatedAt: new Date()
});

const handleFabricSuggestion = async (payload) => ({
  success: true,
  fabricSuggestions: [
    {
      fabric: 'silk',
      reason: `Premium drape for ${payload.occasion || 'formal occasions'}`
    },
    {
      fabric: 'satin',
      reason: 'Smooth finish that works well for statement eveningwear'
    },
    {
      fabric: 'organza',
      reason: 'Adds structure and layering for couture-inspired details'
    }
  ],
  generatedAt: new Date()
});

const taskHandlers = {
  design_generation: handleDesignGeneration,
  style_recommendation: handleStyleRecommendation,
  fabric_suggestion: handleFabricSuggestion
};

const processTask = async (taskInput) => {
  const task = typeof taskInput === 'string'
    ? await AgentTask.findOne({ taskId: taskInput })
    : taskInput;

  if (!task) {
    throw new Error('Agent task not found');
  }

  try {
    task.status = 'processing';
    task.error = undefined;
    await task.save();

    const handler = taskHandlers[task.type];

    if (!handler) {
      throw new Error(`Unsupported task type: ${task.type}`);
    }

    const result = await handler(task.payload, task);

    task.status = 'completed';
    task.result = result;
    task.completedAt = new Date();
    task.error = undefined;
    await task.save();

    return task;
  } catch (error) {
    task.status = 'failed';
    task.error = error.message;
    task.completedAt = new Date();
    await task.save();

    return task;
  }
};

const delegateTask = async (type, payload, userId, designId = null) => {
  const task = await AgentTask.create({
    taskId: uuidv4(),
    type,
    payload,
    userId,
    designId
  });

  setImmediate(() => {
    processTask(task.taskId).catch((error) => {
      console.error('Agent task processing failed unexpectedly:', error);
    });
  });

  return task;
};

const getTaskStatus = async (taskId, userId) => {
  const query = { taskId };

  if (userId) {
    query.userId = userId;
  }

  return AgentTask.findOne(query).sort({ createdAt: -1 });
};

const listUserTasks = async (userId) => AgentTask.find({ userId }).sort({ createdAt: -1 });

module.exports = {
  delegateTask,
  processTask,
  handleDesignGeneration,
  handleStyleRecommendation,
  handleFabricSuggestion,
  generateDesignWithAI,
  getTaskStatus,
  listUserTasks
};
