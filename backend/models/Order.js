const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  note: { type: mongoose.Schema.Types.ObjectId, ref: 'Note', required: true },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  razorpayOrderId: { type: String },
  razorpayPaymentId: { type: String },
  razorpaySignature: { type: String },
  amount: { type: Number },
  status: { type: String, enum: ['created', 'paid', 'failed'], default:'created' }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
