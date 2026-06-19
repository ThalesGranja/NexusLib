const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  author: { type: String, required: true, trim: true },
  year: { type: Number, default: null },
  coverUrl: { type: String, default: null },
  openLibraryId: { type: String, default: null },
}, { timestamps: true });

module.exports = mongoose.model('Book', BookSchema);
