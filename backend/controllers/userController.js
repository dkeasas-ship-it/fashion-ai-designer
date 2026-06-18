const User = require('../models/User');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({
      success: true,
      user: user.getPublicProfile()
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, phone, language } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      { firstName, lastName, phone, language },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      user: user.getPublicProfile()
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.saveMeasurements = async (req, res) => {
  try {
    const { chest, waist, hip, shoulder, length, armLength, unit } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        measurements: {
          chest,
          waist,
          hip,
          shoulder,
          length,
          armLength,
          unit,
          lastUpdated: new Date()
        }
      },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Measurements saved',
      measurements: user.measurements
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};