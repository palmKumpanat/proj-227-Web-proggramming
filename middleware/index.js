const e = require('connect-flash');
const Products  = require('../models/product'),
      Review  = require('../models/review'),
      User    = require('../models/user'),
      Order   = require('../models/order');

const middlewareObj = {};

middlewareObj.checkProductOwner = function(req, res, next){
    if(req.isAuthenticated()){
        Products.findById(req.params.id, function(err, foundProduct){
            if(err){
                res.redirect('back');
            }
            else{
                if(foundProduct.author.id.equals(req.user._id) || req.user.isAdmin){
                    next();
                }
                else{
                    req.flash('error', "You do not have permission to do this action!");
                    res.redirect('back');
                }
            }
        })
    }
    else{
        req.flash('error', "Please login");
        res.redirect('/login');
    }
}

middlewareObj.checkReviewOwner = function(req, res, next){
    if(req.isAuthenticated()){
        Review.findById(req.params.review_id, function(err, foundReview){
            if(err){
                res.redirect('back');
            }
            else{
                if(foundReview.author.id.equals(req.user._id) || req.user.isAdmin){
                    next();
                }
                else{
                    req.flash('error', "You do not have permission to do this action!");
                    res.redirect('back');
                }
            }
        })
    }
    else{
        req.flash('error', "Please login");
        res.redirect('/login');
    }
}

middlewareObj.checkUser = function(req, res, next){
    if(req.isAuthenticated()){
        User.findById(req.params.id, function(err, foundUser){
            if(err){
                res.redirect('back');
            }
            else{
                if(foundUser._id.equals(req.user._id) || req.user.isAdmin){
                    next();
                }
                else{
                    req.flash('error', "You do not have permission to do this action!");
                    res.redirect('back');
                }
            }
        })
    }
    else{
        req.flash('error', "Please login");
        res.redirect('/login');
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error', 'You need to login first');
    res.redirect("/login");
}

module.exports = middlewareObj;