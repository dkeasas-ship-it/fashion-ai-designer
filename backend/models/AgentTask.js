const mongoose = require('mongoose');

const agentTaskSchema = new mongoose.Schema({
  taskId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['design_generation', 'style_recommendation', 'fabric_suggestion'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed'],
    default: 'pending'
  },
  payload: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  result: mongoose.Schema.Types.Mixed,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  designId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Design',
    default: null
  },
  error: String,
  completedAt: Date
}, {
  timestamps: true
});

agentTaskSchema.index({ userId: 1, createdAt: -1 });
agentTaskSchema.index({ status: 1, type: 1 });

module.exports = mongoose.model('AgentTask', agentTaskSchema);
