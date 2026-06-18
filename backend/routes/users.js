const express = require('express');
const { protect } = require('../middleware/auth');
const {
  getProfile,
  updateProfile,
  saveMeasurements
} = require('../controllers/userController');

const router = express.Router();

router.use(protect);

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.post('/measurements', saveMeasurements);

module.exports = router;