const mongoose = require('mongoose');
const shortId = require('shortid');

const urlSchema = new mongoose.Schema({
    originalUrl: String,
    shortUrl: { type: String, unique: true, default: shortId.generate }
});

module.exports = mongoose.model('Url', urlSchema);