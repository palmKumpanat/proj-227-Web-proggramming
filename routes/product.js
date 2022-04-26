const { redirect } = require('express/lib/response');

const express   = require('express'),
      router    = express.Router(),
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
      Products  = require('../models/product'),
      User      = require('../models/user'),
      Cart      = require('../models/cart'),
      middleware = require('../middleware');
    //   Cart      = require('../models/cart'),


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


router.get('/sort-low-to-high', function(req, res){
    Products.find({}).sort([['price', 1]]).exec(function(err, allproducts){
        if(err){
            console.log(err);
        }
        else{
            res.render("landing.ejs", {products: allproducts});
        }
    });
});

router.get('/sort-high-to-low', function(req, res){
    Products.find({}).sort([['price', -1]]).exec(function(err, allproducts){
        if(err){
            console.log(err);
        }
        else{
            res.render("landing.ejs", {products: allproducts});
        }
    });
});

router.get('/find-Shoes', function(req, res){
    Products.find({categories : "Shoes"}, function(err, foundProduct){
        if(err){
            console.log(err);
        }
        else{
            console.log(foundProduct);
            res.render('landing.ejs', {products: foundProduct});
        }
    });
});

router.get('/find-Clothing', function(req, res){
    Products.find({categories : "Clothing"}, function(err, foundProduct){
        if(err){
            console.log(err);
        }
        else{
            console.log(foundProduct);
            res.render('landing.ejs', {products: foundProduct});
        }
    });
});


router.get('/find-sunglasses', function(req, res){
    Products.find({categories : "sunglasses"}, function(err, foundProduct){
        if(err){
            console.log(err);
        }
        else{
            console.log(foundProduct);
            res.render('landing.ejs', {products: foundProduct});
        }
    });
});

router.get('/find-Hat&Cap', function(req, res){
    Products.find({categories : "Hat&Cap"}, function(err, foundProduct){
        if(err){
            console.log(err);
        }
        else{
            console.log(foundProduct);
            res.render('landing.ejs', {products: foundProduct});
        }
    });
});

router.get('/find-Bags', function(req, res){
    Products.find({categories : "Bags"}, function(err, foundProduct){
        if(err){
            console.log(err);
        }
        else{
            console.log(foundProduct);
            res.render('landing.ejs', {products: foundProduct});
        }
    });
});


router.get("/new",middleware.isLoggedIn,function(req, res){ // ส่งไปหน้าเพิ่มสินค้า ( Add Product )
    res.render("product/new.ejs");
});

router.get('/add-to-cart/:id', middleware.isLoggedIn, function(req, res){
    Products.findById(req.params.id, function(err, foundProduct){
        if(err){
            console.log(err);
            return res.redirect('/');
        }
        else{
            const cart = {user : {id:req.user._id}};
            Cart.findOne({user: {id:req.user._id}} ,function(err, foundCart){
                if(err){
                    console.log(err);
                }
                else{
                    if(!foundCart){
                        Cart.create(cart, function(err, newCart){
                            if(err){
                                console.log(err);
                            }
                            else{
                                newCart.products.push(foundProduct);
                                newCart.products.qty ++;
                                newCart.totalprice = 0;
                                newCart.totalprice += foundProduct.price;
                                newCart.save();
                                res.redirect('/'); 
                            }
                        })
                    }
                    else{
                        foundCart.products.push(foundProduct);
                        foundCart.products.qty ++;
                        foundCart.totalprice += foundProduct.price;
                        foundCart.save();
                        res.redirect('/'); 
                    }
                }
            })
        }
    });
});

router.get("/shopping-cart",middleware.isLoggedIn,function(req, res){
    Cart.findOne({user : {id : req.user._id}}).populate('products').populate('user').exec(function(err, foundCart){
        if(err){
            console.log(err);
        }
        else{
            res.render('product/shopping-cart', {cart: foundCart});
        }
    });
});

router.get('/checkout', function(req, res){
    Cart.findOne({user : {id : req.user._id}}).populate('products').populate('user').exec(function(err, foundCart){
        if(err){
            console.log(err);
        }
        else{
            foundCart.user.address = req.user.address;
            foundCart.user.postalCode = req.user.postalCode;
            foundCart.user.city = req.user.city;
            foundCart.save();
            res.render('product/checkout.ejs', {cart : foundCart});
        }
    });
});

router.get('/remove/:id', function(req, res){
    Products.findById(req.params.id, function(err, foundProduct){
        if(err){
            console.log(err);
        }
        else{
            Cart.findOne({user: {id:req.user._id}}, function(err, foundCart){
                if(err){
                    console.log(err);
                }
                else{
                    foundCart.remove(foundProduct); 
                    res.redirect('/shopping-cart');
                }
            })
        }
    });
});

// router.get('/remove/:id',function(req, res){
//     Products.findById(req.params.id, function(err, foundProduct){
//         if(err){
//             console.log(err);
//         }
//         else
//         Cart.findOne({user : {id : req.user._id}}, function(err, foundCart){
//             if(err){
//                 console.log(err);
//             }
//             else{
//                 delete foundCart.foundProduct;
//                 // foundCart.totalprice -= foundProduct.price;
//                 // foundProduct.qty--;
//                 // if(foundProduct.qty <= 0){
//                 //     delete foundProduct ;
//                 // }
//             }
//         })
//     })
// })


// router.get('/add-to-cart/:id',middleware.isLoggedIn, function(req, res, next){
//     var productId = req.params.id;
//     var cart = new Cart(req.session.cart ? req.session.cart :{});

//     Products.findById(productId, function(err, product){
//         if(err){
//             console.log(err);
//             return res.redirect('/');
//         }
//         else{
//             cart.add(product, product.id);
//             req.session.cart = cart;
//             console.log(req.session.cart);
//             res.redirect('/');
//         }
//     });
// });

// router.get('/remove/:id', function(req, res, next){
//     var productId = req.params.id;
//     var cart = new Cart(req.session.cart ? req.session.cart :{});

//     cart.removeProductInCart(productId);
//     req.session.cart = cart;
//     res.redirect('/shopping-cart');
// });

// router.get('/shopping-cart',middleware.isLoggedIn ,function(req, res, next){
//     if(!req.session.cart){
//         return res.render('product/shopping-cart', {products: null});
//     }
//     var cart = new Cart(req.session.cart);
//     res.render('product/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice, url: cart.url});
// });



router.post("/",middleware.isLoggedIn,upload.single('image'),function(req, res){ // รับข้อมูลจาก form ที่เพิ่มสินค้า มาเเสดงผล สินค้า ( หน้าเเรก )
    req.body.product.image = '/upload/' + req.file.filename;
    req.body.product.author = {
        id: req.user._id,
        username: req.user.username
    };
    Products.create(req.body.product, function(err, newlyAdded){
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
