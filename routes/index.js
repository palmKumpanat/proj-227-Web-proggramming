const express  = require('express'),
      router   = express.Router(),
      User     = require('../models/user'),
      Order    = require('../models/order'),
      multer    = require('multer'),
      path      = require('path'),
      storage   =  multer.diskStorage({
                    destination: function(req, file, callback){
                        callback(null,'./public/upload/');
                    },
                    filename: function(req, file, callback){
                        callback(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname));
                    }
      }),
      imageFilter = function(req, file, callback){
          if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)){
              return callback(new Error('Only jpg, jpeg, png and gif.'), false);
          }
          callback(null, true);
      },
      upload = multer({storage: storage, fileFilter: imageFilter}),
      passport = require('passport');


router.get('/register', function(req, res){    // สร้าง rout ไปหน้า register
    res.render("register.ejs");
});

router.post('/register', upload.single('profileImage'), function(req, res){
    req.body.profileImage = '/upload/'+req.file.filename;
    let newUser = new User
    ({  
                            username: req.body.username,
                            firstName : req.body.firstName,
                            lastName  : req.body.lastName,
                            email : req.body.email,
                            profileImage : req.body.profileImage,
                            address: req.body.address,
                            postalCode: req.body.postalCode,
                            city: req.body.city
    });
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
});

router.get('/user/:id', function(req, res){
    User.findById(req.params.id, function(err, foundUser){
        if(err){
            console.log(err);
            req.flash('error', 'There is something wrong!');
            return res.redirect('/');
        }
        else{
            Order.find().where('user.id').equals(foundUser._id).exec(function(err, foundOrder){
                if(err){
                    console.log(err);
                    req.flash('error', 'There is something wrong!');
                    return res.redirect('/');
                }
                else{
                    res.render('user/show.ejs', {user : foundUser, orders:foundOrder});
                }
            })
        }
    });
});

router.get('/order/:id/view-more', function(req, res){
    Order.findById(req.params.id).populate('cart').exec(function(err, foundOrder){
        if(err){
            console.log(err);
        }
        else{
            res.render('order/view.ejs', {order : foundOrder});
        }
    });
});

module.exports = router;

