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
                    res.redirect("/view/"+foundProduct._id);
                }
            });
        }
    });
});

router.get('/:review_id/edit-review', middleware.checkReviewOwner,function(req, res){
    Review.findById(req.params.review_id, function(err, foundReview){
        if(err){
            console.log(err);
            res.redirect('back');
        }
        else{
            res.render('reviews/edit.ejs', {product_id:req.params.id , review: foundReview});
        }
    });
});

router.put('/:review_id', middleware.checkReviewOwner, function(req, res){
    Review.findByIdAndUpdate(req.params.review_id, req.body.review , function(err, updatedReview){
        if(err){
            console.log(err);
            res.redirect('back');
        }
        else{
            res.redirect('/view/'+req.params.id);
        }
    });
});

router.delete('/:review_id',middleware.checkReviewOwner, function(req, res){
    Review.findByIdAndRemove(req.params.review_id , function(err){
        if(err){
            req.flash('error', "There are something wrong!");
            res.redirect('/view/'+req.params.id);
        }
        else{
            req.flash('success', "Your review was deleted.");
            res.redirect('/view/'+req.params.id);
        }
    });
});


module.exports = router;