const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    code: { type: String, required: true, unique: true, index: true },
    target: { type: String, required: true },
    totalClicks: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    lastClickedAt: { type: Date, default: null }
});

module.exports = mongoose.model('ShortUrl', schema);
