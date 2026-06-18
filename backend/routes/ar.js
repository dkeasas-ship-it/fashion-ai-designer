const express = require('express');
const { protect } = require('../middleware/auth');
const { tryOn, getARTryOns } = require('../controllers/arController');

const router = express.Router();

router.use(protect);

router.post('/try-on', tryOn);
router.get('/try-ons/:designId', getARTryOns);

module.exports = router;