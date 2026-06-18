const express = require('express');
const { protect } = require('../middleware/auth');
const { generateDesign } = require('../controllers/aiController');

const router = express.Router();

router.use(protect);
router.post('/generate-design', generateDesign);

module.exports = router;