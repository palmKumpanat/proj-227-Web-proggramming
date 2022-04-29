const { redirect } = require('express/lib/response');
const { off } = require('process');
const product = require('../models/product');

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
                                newCart.totalprice = 0;
                                newCart.totalprice += foundProduct.price * foundProduct.qty;
                                newCart.totalQty = 0;
                                newCart.totalQty ++;
                                newCart.save();
                                req.flash('success', 'Add to shopping cart successfully!');
                                res.redirect('/'); 
                            }
                        })
                    }
                    else{
                        foundCart.products.push(foundProduct);
                        foundCart.totalprice += foundProduct.price * foundProduct.qty;
                        foundCart.totalQty++;
                        foundCart.save();
                        req.flash('success', 'Add to shopping cart successfully!');
                        res.redirect('/'); 
                    }
                }
            });
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
            foundCart.Shipping = 24;
            foundCart.totalPayment = foundCart.totalprice + foundCart.Shipping;
            // foundCart.save();
            res.render('product/checkout.ejs', {cart : foundCart});
        }
    });
});

// router.get('/shopping-cart/:id/plus-qty', function(req, res){
//     Products.findById(req.params.id, function(err, foundProduct){
//         if(err){
//             console.log(err);
//         }
//         else{
//             Cart.findOne({user: {id:req.user._id}}, function(err, foundCart){
//                 if(err){
//                     console.log(err);
//                 }
//                 else{
//                     // foundProduct.qty++;
//                     // foundProduct.totalPrice = foundProduct.price;
//                     // foundProduct.totalPrice += foundProduct.price;
//                     // foundProduct.save();
//                     res.redirect('/shopping-cart');
//                 }
//             })
//         }
//     })
// })

// router.get('/shopping-cart/:id/plus-qty', function(req, res){
//     req.body.products = {
//         id: req.params.id,
//         name: req.params.name,
//         image : req.params.image,
//         qty : req.params.qty,
//         price : req.params.price
//     }
//     Products.find(req.body.products, function(err, products){
//         if(err){
//             console.log(err);
//         }
//         else{
//             Cart.findOne({user: {id:req.user._id}}, function(err, foundCart){
//                 if(err){
//                     console.log(err);
//                 }
//                 else{
//                     foundCart.products.qty++;
//                     foundCart.save();
//                     res.redirect('/shopping-cart');
//                 }
//             })
//         }
//     })
// })


// router.get('/shopping-cart/:id/minus-qty', function(req, res){
//     Products.findById(req.params.id, function(err, foundProduct){
//         if(err){
//             console.log(err);
//         }
//         else{
//             Cart.findOne({user: {id:req.user._id}}, function(err, foundCart){
//                 if(err){
//                     console.log(err);
//                 }
//                 else{
//                     // foundCart.products.update({_id:foundProduct},{$set: foundProduct.qty++});
//                     foundCart.products.qty--;
//                     foundCart.totalprice -= foundCart.products.price;
//                     foundCart.save();
//                     res.redirect('/shopping-cart');
//                 }
//             })
//         }
//     })
// })

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
                    if(foundCart.products.length > 1){
                        foundProduct.qty = 1;
                        foundProduct.save();
                        foundCart.products.pull(foundProduct);
                        req.flash('success','Remove successfully!');
                        foundCart.totalprice -= foundProduct.price;
                        foundCart.totalQty--;
                        foundCart.save();
                        res.redirect('/shopping-cart');
                    }
                    else{
                        foundProduct.qty = 1;
                        foundProduct.save();
                        foundCart.remove();
                        foundCart.totalprice -= foundProduct.price;
                        foundCart.totalQty--;
                        res.redirect('/shopping-cart');
                    }
                }
            });
        }
    });
});


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

router.get('/:id/edit-product',middleware.checkProductOwner, function(req, res){
    Products.findById(req.params.id, function(err, foundProduct){
        if(err){
            console.log(err);
        }
        else{
            res.render("product/edit.ejs", {product: foundProduct});
        }
    });
});

router.put('/:id',upload.single('image'), function(req, res){
    if(req.file){
        req.body.product.image = '/upload/'+req.file.filename;
    }
    Products.findByIdAndUpdate(req.params.id, req.body.product, function(err, updatedProduct){
        if(err){
            console.log(err);
            res.redirect('/');
        }
        else{
            res.redirect('/'+req.params.id);
        }
    })
})

router.delete('/:id', middleware.checkProductOwner,function(req, res){
    Products.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
            res.redirect('/');
        }
        else{
            res.redirect('/');
        }
    })
})


module.exports = router;
