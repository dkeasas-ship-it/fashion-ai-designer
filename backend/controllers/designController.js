const Design = require('../models/Design');

exports.createDesign = async (req, res) => {
  try {
    const { occasion, dressType, customDescription, measurements } = req.body;

    const design = await Design.create({
      userId: req.userId,
      occasion,
      dressType,
      customDescription,
      measurements,
      status: 'draft'
    });

    res.status(201).json({
      success: true,
      design
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserDesigns = async (req, res) => {
  try {
    const designs = await Design.find({ userId: req.userId })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      designs
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDesignById = async (req, res) => {
  try {
    const design = await Design.findById(req.params.id);

    if (!design) {
      return res.status(404).json({ message: 'Design not found' });
    }

    if (design.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json({
      success: true,
      design
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateDesign = async (req, res) => {
  try {
    let design = await Design.findById(req.params.id);

    if (!design) {
      return res.status(404).json({ message: 'Design not found' });
    }

    if (design.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    design = await Design.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({
      success: true,
      design
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteDesign = async (req, res) => {
  try {
    const design = await Design.findById(req.params.id);

    if (!design) {
      return res.status(404).json({ message: 'Design not found' });
    }

    if (design.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Design.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Design deleted'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};