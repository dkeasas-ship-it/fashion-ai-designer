const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  // Order Reference
  orderNumber: {
    type: String,
    unique: true,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // Design Reference
  designId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Design',
    required: true
  },
  designSnapshot: {
    occasion: String,
    dressType: String,
    description: String,
    image: String
  },

  // Measurements Snapshot
  measurements: {
    chest: Number,
    waist: Number,
    hip: Number,
    shoulder: Number,
    length: Number,
    armLength: Number,
    unit: String,
    takenAt: Date
  },

  // Tailor Information (Optional)
  tailorAssignment: {
    tailorId: String,
    tailorName: String,
    assignedAt: Date,
    completedAt: Date,
    notes: String
  },

  // Order Details
  quantity: {
    type: Number,
    default: 1
  },
  fabricChoice: {
    type: String,
    enum: ['silk', 'chiffon', 'satin', 'lace', 'tulle', 'organza'],
    required: true
  },
  colorChoice: String,
  budget: Number,

  // Order Status
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'in_production', 'ready', 'delivered', 'cancelled'],
    default: 'pending'
  },

  // Timeline
  timeline: {
    orderDate: {
      type: Date,
      default: Date.now
    },
    estimatedDelivery: Date,
    actualDelivery: Date,
    statusUpdates: [{
      status: String,
      date: Date,
      notes: String
    }]
  },

  // Payment
  payment: {
    method: {
      type: String,
      enum: ['credit_card', 'debit_card', 'paypal', 'bank_transfer'],
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending'
    },
    amount: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'USD'
    },
    transactionId: String,
    paidAt: Date
  },

  // Delivery Address
  deliveryAddress: {
    fullName: String,
    phone: String,
    address: String,
    city: String,
    country: String,
    postalCode: String
  },

  // Customer Communication
  notes: String,
  attachments: [{
    type: String
  }],

  // Admin Notes
  adminNotes: String,

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Generate unique order number
orderSchema.pre('save', async function(next) {
  if (!this.orderNumber) {
    const count = await mongoose.model('Order').countDocuments();
    this.orderNumber = `ORD-${Date.now()}-${count + 1}`;
  }
  next();
});

// Index for faster queries
orderSchema.index({ userId: 1, createdAt: -1 });
orderSchema.index({ status: 1 });
orderSchema.index({ orderNumber: 1 });

module.exports = mongoose.model('Order', orderSchema);
