const express  = require('express'),
      router   = express.Router({mergeParams: true}),
      Products  = require('../models/product'),
      Review  = require('../models/review'),
      middleware = require('../middleware');

router.get("/new", middleware.isLoggedIn, function(req, res){ // ส่งข้อมูล id ไปหน้าเพิ่ม Review
    Products.findById(req.params.id, function(err, foundProduct){
        if(err){
            console.log(err);
        }
        else{
            res.render("reviews/new.ejs", {product : foundProduct})
        }
    });
}); 


router.post("/",  middleware.isLoggedIn ,function(req, res){ // รับข้อมูลจาก form ที่เพิ่ม review มาเเสดงผล review ( หน้าเเสดงรายละเอียดสินค้า )
    Products.findById(req.params.id, function(err, foundProduct){
        if(err){
            console.log(err);
        }
        else{
            Review.create(req.body.review, function(err, review){
                if(err){
                    console.log(err);
                }
                else{
                    review.author.id = req.user._id;
                    review.author.username = req.user.username;
                    review.save();
                    foundProduct.reviews.push(review);
                    foundProduct.save();
                    res.redirect("/"+foundProduct._id);
                }
            });
        }
    });
}); 


module.exports = router;