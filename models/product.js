const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    price : Number,
    url : String,
    categories : String,
    details : String,
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

module.exports = mongoose.model('Products', productSchema);