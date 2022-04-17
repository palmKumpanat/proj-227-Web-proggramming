const express   = require('express'),
      router    = express.Router(),
      Products  = require('../models/product'),
      Cart      = require('../models/cart');


router.get("/", function(req, res){ // ส่งข้อมูลของสินค้าไปเเสดงใน forEach 
    Products.find({}, function(err, allproducts){  // หาข้อมูลที่อยู่ใน database เพื่อส่งไปเเสดงผล
        if(err){
            console.log(err);
        }
        else{
            res.render("landing.ejs", {products: allproducts});
        }
    });
});

router.get("/new", function(req, res){ // ส่งไปหน้าเพิ่มสินค้า ( Add Product )
    res.render("product/new.ejs");
});


router.get('/add-to-cart/:id', function(req, res, next){
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart :{});

    Products.findById(productId, function(err, product){
        if(err){
            console.log(err);
            return res.redirect('/');
        }
        else{
            cart.add(product, product.id);
            req.session.cart = cart;
            console.log(req.session.cart);
            res.redirect('/');
        }
    });
});

router.get('/shopping-cart', function(req, res, next){
    if(!req.session.cart){
        return res.render('product/shopping-cart', {products: null});
    }
    var cart = new Cart(req.session.cart);
    res.render('product/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice, url: cart.url});
});



router.post("/", function(req, res){ // รับข้อมูลจาก form ที่เพิ่มสินค้า มาเเสดงผล สินค้า ( หน้าเเรก )
    let name = req.body.name;
    let price = req.body.price;
    let url = req.body.url;
    let details = req.body.details;
    let newProduct = {name:name, price:price, url:url, details:details};
    Products.create(newProduct, function(err, newlyAdded){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/");
        }
    });
});



router.get("/:id", function(req, res){      // ส่งข้อมูล id ไปเเสดงผลข้อมูล (รายละเอียดของสินค้า)
    Products.findById(req.params.id).populate('reviews').exec(function(err, foundProduct){
        if(err){
            console.log(err);
        }
        else{
            res.render("product/viewMore.ejs", {product : foundProduct});
        }
    });
});



module.exports = router;