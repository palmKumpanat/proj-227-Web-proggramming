const express  = require('express'),
      router   = express.Router(),
      User     = require('../models/user'),
      passport = require('passport');


router.get('/register', function(req, res){    // สร้าง rout ไปหน้า register
    res.render("register.ejs");
});

router.post('/register', function(req, res){
    let newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.redirect('/register');
        }
        else{
            passport.authenticate('local')(req, res, function(){
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
        failureRedirect: '/login'
    }), function(req, res){
});

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
})

module.exports = router;
