const express = require('express');
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/auth');
const Note = require('../models/Note');
const Order = require('../models/Order');

const router = express.Router();

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + '-' + Math.round(Math.random()*1e9) + ext);
  }
});
const upload = multer({ storage });

// upload note (only sellers)
router.post('/upload', auth, upload.single('file'), async (req, res) => {
  try {
    if (req.user.role !== 'seller') return res.status(403).json({ message: 'Only sellers can upload' });
    const { title, subject, description } = req.body;
    if (!req.file) return res.status(400).json({ message: 'File required' });

    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    const note = new Note({
      title, subject, description, price: 5, fileUrl, uploadedBy: req.user._id
    });
    await note.save();
    res.json({ message: 'Note uploaded', note });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// list notes (public)
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find().populate('uploadedBy', 'name email');
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// get single note
router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id).populate('uploadedBy', 'name email');
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// download - only if uploader or buyer purchased
router.get('/download/:id', auth, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });

    // uploader can always download
    if (note.uploadedBy.toString() === req.user.id.toString()) {
      return res.redirect(note.fileUrl);
    }

    // buyer must have paid order
    const order = await Order.findOne({ note: note._id, buyer: req.user._id, status: 'paid' });
    if (!order) return res.status(403).json({ message: 'You have not purchased this note' });

    return res.redirect(note.fileUrl);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
