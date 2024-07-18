const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: {
    type: Number,
    unique: true,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  serviceType: String,
  paperType: String,
  subjectArea: String,
  topic: String,
  paperDetails: String,
  paperFormat: String,
  references: Number,
  academicLevel: String,
  pageCount: Number,
  spacing: String,
  urgency: String,
  writerLevel: String,
  additionalInstructions: String,
  additionalServices: [String],
  notifications: [String],
  email: String,
  phoneNumber: String,
  fullName: String,
  preferredContactMethod: String,
  timezone: String,
  totalPrice: Number,
  files: [String],
  createdAt: {
    type: Date,
    default: Date.now
  },
  paymentStatus: {
    type: String,
    enum: ['NOT PAID', 'PAID'],
    default: 'NOT PAID'
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
