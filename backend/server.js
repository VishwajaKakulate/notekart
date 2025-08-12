const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');
// const paymentRoutes = require('./routes/paymentRoutes');

const app = express();

// Enable CORS for your frontend
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Parse JSON request bodies
app.use(express.json());

// Serve uploaded files (PDFs, etc.)
app.use("/uploads", express.static("uploads"));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);
// app.use('/api/payment', paymentRoutes);

// Health check route
app.get('/api/health', (req, res) => res.json({ ok: true }));

// Connect to DB
connectDB(process.env.MONGO_URI);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
