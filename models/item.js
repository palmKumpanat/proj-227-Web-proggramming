const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({

    product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Products'
    },
    name : String,
    quantity : Number,
    image : String,
    unitPrice : Number,
    totalPrice : Number
});

module.exports = mongoose.model('Items', itemSchema);