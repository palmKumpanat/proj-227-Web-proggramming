const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
    date: String,
    shippingAddress: String,
    totalPrice : Number,
    status : String,
    shippingTotal : Number,
    totalPayment : Number,
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
        id : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Cart'
        },
        totalQty : Number,
        items: [{
            id:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Items'
            },
            name : String,
            unitPrice : Number,
            image : String,
            quantity : Number,
            totalPrice : Number
        }]

    }]  

});

module.exports = mongoose.model('Order', orderSchema);