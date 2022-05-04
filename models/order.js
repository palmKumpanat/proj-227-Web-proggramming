const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
    date: String,
    shippingAddress: String,
    payment: {
        cardNumber : String,
        expiryDate : String,
        CVV : String,
        nameOnCard : String
    },
    user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        firstName : String,
        lastName : String
    },
    cart: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Cart'
        }
    }]  

});

module.exports = mongoose.model('Order', orderSchema);