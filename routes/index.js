const express  = require('express'),
      router   = express.Router(),
      User     = require('../models/user'),
      passport = require('passport');


router.get('/register', function(req, res){    // สร้าง rout ไปหน้า register
    res.render("register.ejs");
});

router.post('/register', function(req, res){
    let newUser = new User({username: req.body.username, address: req.body.address, postalCode: req.body.postalCode, city: req.body.city});
    if(req.body.adminCode === 'topsecret'){
        newUser.isAdmin = true;
    }
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash('error', err.message);
            return res.redirect('/register');
        }
        else{
            passport.authenticate('local')(req, res, function(){
            req.flash('success', user.username + ', Welcome to PalmShop ');
            res.redirect('/');
            });
        }
    });
})

router.get('/login', function(req, res){    // สร้าง rout ไปหน้า login
    res.render("login.ejs");
});

router.post('/login', passport.authenticate('local',
    {
        successRedirect: '/' ,
        failureRedirect: '/login',
        successFlash: true,
        failureFlash: true,
        successFlash: 'Successfully login',
        failureFlash: 'Invalid username or password'
    }), function(req, res){
});

router.get('/logout', function(req, res){
    req.logout();
    req.flash('success', 'Log you out successfully');
    res.redirect('/');
})

module.exports = router;
