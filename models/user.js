const mongoose = require('mongoose'),
      passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password : Number,
    address : String,
    Ccarts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ccart'
        }
    ]
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);