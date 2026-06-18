const Order = require('../models/Order');
const Design = require('../models/Design');
const User = require('../models/User');

exports.createOrder = async (req, res) => {
  try {
    const { designId, fabricChoice, colorChoice, deliveryAddress } = req.body;

    // Get design and user
    const design = await Design.findById(designId);
    const user = await User.findById(req.userId);

    if (!design) {
      return res.status(404).json({ message: 'Design not found' });
    }

    if (design.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Calculate price (mock calculation)
    const basePrice = 300;
    const fabricPrices = { silk: 150, chiffon: 100, satin: 120, lace: 140, tulle: 110, organza: 105 };
    const total = basePrice + (fabricPrices[fabricChoice] || 100);

    // Create order
    const order = await Order.create({
      userId: req.userId,
      designId,
      designSnapshot: {
        occasion: design.occasion,
        dressType: design.dressType,
        description: design.customDescription,
        image: design.selectedImage?.url || design.designImages[0]?.url
      },
      measurements: user.measurements,
      fabricChoice,
      colorChoice,
      deliveryAddress,
      payment: {
        amount: total,
        method: 'credit_card'
      }
    });

    // Update design status
    design.status = 'ordered';
    design.orderId = order._id;
    await design.save();

    res.status(201).json({
      success: true,
      order,
      totalAmount: total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId })
      .populate('designId')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      orders
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('designId');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json({
      success: true,
      order
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status, notes } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    order.status = status;
    if (notes) order.notes = notes;
    
    order.timeline.statusUpdates.push({
      status,
      date: new Date(),
      notes
    });

    await order.save();

    res.json({
      success: true,
      order
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};