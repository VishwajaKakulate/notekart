const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true }, // Added trim to clean spaces
    subject: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    price: { type: Number, default: 0 }, // 0 means free by default
    fileUrl: { type: String, required: true }, // Stores full path to file (served from /uploads)
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Note', NoteSchema);
