const mongoose = require('mongoose');
const shortId = require('shortid');

const urlSchema = new mongoose.Schema({
    originalUrl: String,
    shortUrl: String,
});

urlSchema.pre('save', function(next) {
    this.shortUrl = shortId.generate();
    next();
});

module.exports = mongoose.model('Url', urlSchema);
