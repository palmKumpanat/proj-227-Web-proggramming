const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    price : Number,
    qty : Number,
    image : String,
    categories : String,
    // totalPrice : Number,
    details : String,
    author:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
});

module.exports = mongoose.model('Products', productSchema);