const mongoose = require('mongoose'),
      passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password : Number,
    address : String,
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);