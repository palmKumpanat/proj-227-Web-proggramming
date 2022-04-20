const mongoose = require('mongoose');

const CcartSchema = new mongoose.Schema({
    name: String,
    url : String,
    price : Number,
    qty : Number
});

module.exports = mongoose.model('Ccart', CcartSchema);