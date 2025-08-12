// const express = require('express');
// const Razorpay = require('razorpay');
// const crypto = require('crypto');
// const auth = require('../middleware/auth');
// const Note = require('../models/Note');
// const Order = require('../models/Order');

// const router = express.Router();

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET
// });

// // create order
// router.post('/create-order/:noteId', auth, async (req, res) => {
//   try {
//     const note = await Note.findById(req.params.noteId);
//     if (!note) return res.status(404).json({ message: 'Note not found' });

//     const amountInPaise = (note.price || 5) * 100; // ₹ -> paise
//     const options = {
//       amount: amountInPaise,
//       currency: 'INR',
//       receipt: `receipt_${Date.now()}_${req.user._id}`,
//       payment_capture: 1
//     };

//     const order = await razorpay.orders.create(options);

//     const dbOrder = new Order({
//       note: note._id,
//       buyer: req.user._id,
//       razorpayOrderId: order.id,
//       amount: amountInPaise,
//       status: 'created'
//     });
//     await dbOrder.save();

//     res.json({ order, note });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // verify payment
// router.post('/verify', auth, async (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
//     const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
//       .update(razorpay_order_id + '|' + razorpay_payment_id)
//       .digest('hex');

//     if (generated_signature !== razorpay_signature) {
//       return res.status(400).json({ message: 'Invalid signature' });
//     }

//     const order = await Order.findOne({ razorpayOrderId: razorpay_order_id });
//     if (!order) return res.status(404).json({ message: 'Order not found' });

//     order.razorpayPaymentId = razorpay_payment_id;
//     order.razorpaySignature = razorpay_signature;
//     order.status = 'paid';
//     await order.save();

//     return res.json({ message: 'Payment verified', order });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// module.exports = router;
