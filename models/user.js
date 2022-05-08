const mongoose = require('mongoose'),
      passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password : Number,
    firstName : String,
    lastName : String,
    email : String,
    profileImage : String,
    address : String,
    postalCode : String,
    city : String,
    status : String,
    isAdmin: {type : Boolean, default: false}
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);