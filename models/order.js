const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
    date: String,
    shippingAddress: String,
    totalPrice : String,
    status : String,
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
        },
        totalprice : String
    }]  

});

module.exports = mongoose.model('Order', orderSchema);