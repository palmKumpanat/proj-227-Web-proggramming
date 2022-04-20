const Products  = require('../models/product'),
      Review  = require('../models/review');

const middlewareObj = {};


middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error', 'You need to login first');
    res.redirect("/login");
}

module.exports = middlewareObj;