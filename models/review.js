const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    author: String,
    text : String
});

module.exports = mongoose.model('Review', reviewSchema);