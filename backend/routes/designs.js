const express = require('express');
const { protect } = require('../middleware/auth');
const {
  createDesign,
  getUserDesigns,
  getDesignById,
  updateDesign,
  deleteDesign
} = require('../controllers/designController');

const router = express.Router();

router.use(protect);

router.post('/', createDesign);
router.get('/', getUserDesigns);
router.get('/:id', getDesignById);
router.put('/:id', updateDesign);
router.delete('/:id', deleteDesign);

module.exports = router;