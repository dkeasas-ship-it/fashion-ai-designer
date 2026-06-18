const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();

// ============= Middleware =============
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// ============= Database Connection =============
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/fashion-ai-designer')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// ============= Routes =============
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'success',
    message: 'Fashion AI Designer API is running',
    timestamp: new Date().toISOString()
  });
});

// Auth Routes
app.use('/api/auth', require('./routes/auth'));

// User Routes
app.use('/api/users', require('./routes/users'));

// Design Routes
app.use('/api/designs', require('./routes/designs'));

// AI Routes
app.use('/api/ai', require('./routes/ai'));

// AR Routes
app.use('/api/ar', require('./routes/ar'));

// Order Routes
app.use('/api/orders', require('./routes/orders'));

// ============= Error Handling =============
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found'
  });
});

// ============= Start Server =============
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🗄️  Database: ${process.env.MONGODB_URI || 'mongodb://localhost:27017/fashion-ai-designer'}`);
});

module.exports = app;