const e = require('connect-flash');
const { redirect } = require('express/lib/response');
const { off } = require('process');
const { findByIdAndUpdate } = require('../models/product');
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
      Order     = require('../models/order'),
      Item      = require('../models/item'),
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
            res.render('landing.ejs', {products: foundProduct});
        }
    });
});

router.post('/search', function(req, res){
    let keyword = req.body.keyword;
    res.redirect("/search/"+keyword);
});

router.get('/search/:keyword', function(req, res){
    let keyword = req.params.keyword;
    Products.find({name :{$regex : keyword, $options :"i"}}).exec(function(err, foundProduct){
        if(err){
            console.log(err);
        }
        else{
            res.render('landing.ejs', {products: foundProduct});
        }
    });
});


router.get("/new",middleware.isLoggedIn,function(req, res){ // ส่งไปหน้าเพิ่มสินค้า ( Add Product )
    res.render("product/new.ejs");
});

router.get('/:id/add-to-cart', middleware.isLoggedIn, function(req, res){
    Products.findById(req.params.id, function(err, foundProduct){
        if(err){
            console.log(err);
            return res.redirect('/');
        }
        else{         
            const item = {product : req.params.id};
            Item.create(item, function(err, newItem){
                if(err){
                    console.log(err);
                }
                else{
                    newItem.name = foundProduct.name;
                    newItem.quantity = 1;
                    newItem.image = foundProduct.image;
                    newItem.unitPrice = foundProduct.price;
                    newItem.totalPrice = foundProduct.price;
                    // newItem.totalPrice = newItem.totalPrice + (newItem.unitPrice * newItem.quantity) ;
                    newItem.save();
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
                                        newCart.items.push(newItem);
                                        newCart.totalprice = 0;
                                        newCart.totalprice += newItem.totalPrice;
                                        newCart.totalQty = 0;
                                        newCart.totalQty ++;
                                        newCart.save();
                                        req.flash('success', 'Add to shopping cart successfully!');
                                        res.redirect('/'); 
                                    }
                                })
                            }
                            else{
                                foundCart.items.push(newItem);
                                foundCart.totalprice += newItem.totalPrice;
                                foundCart.totalQty++;
                                foundCart.save();
                                req.flash('success', 'Add to shopping cart successfully!');
                                res.redirect('/'); 
                            }
                        }
                    });
                }
            });
          }
     });
});

router.get("/shopping-cart",middleware.isLoggedIn,function(req, res){
    Cart.findOne({user : {id : req.user._id}}).populate('user').populate('items').exec(function(err, foundCart){
        if(err){
            console.log(err);
        }
        else{
            res.render('product/shopping-cart', {cart: foundCart});
        }
    });
});




router.get('/shopping-cart/checkout', function(req, res){
    Cart.findOne({user : {id : req.user._id}}).populate('items').populate('user').exec(function(err, foundCart){
        if(err){
            console.log(err);
        }
        else{
            foundCart.user.firstName = req.user.firstName;
            foundCart.user.lastName = req.user.lastName;
            foundCart.user.address = req.user.address;
            foundCart.user.postalCode = req.user.postalCode;
            foundCart.user.city = req.user.city;
            foundCart.Shipping = 24;
            foundCart.totalPayment = foundCart.totalprice + foundCart.Shipping;
            foundCart.save();
            res.render('product/checkout.ejs', {cart : foundCart});
        }
    });
});


router.post('/shopping-cart/:id/place-Order', function(req, res){
    Cart.findById(req.params.id).populate('items').populate('user').exec(function(err, foundCart){
        if(err){
            console.log(err);
        }
        else{
            const order = {user : {id:req.user._id}};
            Order.findOne({user : {id: req.user._id}}, function(err, foundOrder){
                if(err){
                    console.log(err);
                }
                else{
                    Order.create(order, function(err, newOrder){
                        if(err){
                                console.log(err);
                        }
                        else{
                            newOrder.date = new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: 'long', day: '2-digit'}).format(new Date());
                            newOrder.user.firstName = req.user.firstName;
                            newOrder.user.lastName = req.user.lastName;
                            newOrder.shippingAddress = req.body.shippingAddress;
                            newOrder.payment = req.body.payment;
                            newOrder.cart.push(foundCart);
                            newOrder.totalPrice = foundCart.totalprice;
                            newOrder.status = 'Paid';
                            newOrder.shippingTotal = 24;
                            newOrder.totalPayment = newOrder.totalPrice + newOrder.shippingTotal;
                            newOrder.save();
                            req.flash('success', 'successfully, Your order is complete.');
                            res.redirect('/');
                        }
                    });
                }
            });
        }
    });
});

router.get('/shopping-cart/:id/plus-qty', function(req, res){
    Item.findById(req.params.id, function(err, foundItem){
        if(err){
            console.log(err);
        }
        else{
            Cart.findOne({user: {id:req.user._id}}, function(err, foundCart){
                if(err){
                    console.log(err);
                }
                else{
                    foundItem.quantity ++;
                    foundItem.totalPrice += foundItem.unitPrice;
                    foundCart.totalprice += foundItem.unitPrice;
                    foundCart.totalQty++;
                    foundItem.save();
                    foundCart.save();
                    res.redirect('/shopping-cart');
                }
            });
        }
    });
});

router.get('/shopping-cart/:id/minus-qty', function(req, res){
    Item.findById(req.params.id, function(err, foundItem){
        if(err){
            console.log(err);
        }
        else{
            Cart.findOne({user: {id:req.user._id}}, function(err, foundCart){
                if(err){
                    console.log(err);
                }
                else{
                    foundItem.quantity --;
                    foundItem.totalPrice -= foundItem.unitPrice;
                    foundCart.totalprice -= foundItem.unitPrice;
                    foundCart.totalQty--;
                    foundItem.save();
                    foundCart.save();
                    res.redirect('/shopping-cart');
                }
            });
        }
    });
});

router.get('/:id/remove', function(req, res){
    Item.findById(req.params.id, function(err, foundItem){
        if(err){
            console.log(err);
        }
        else{
            Cart.findOne({user: {id:req.user._id}}, function(err, foundCart){
                if(err){
                    console.log(err);
                }
                else{
                    if(foundCart.items.length > 1){
                        foundItem.quantity = 1;
                        foundItem.save();
                        foundCart.items.pull(foundItem);
                        req.flash('success','Remove successfully!');
                        foundCart.totalprice -= foundItem.unitPrice;
                        foundCart.totalQty--;
                        foundCart.save();
                        res.redirect('/shopping-cart');
                    }
                    else{
                        foundItem.quantity = 1;
                        foundItem.save();
                        foundCart.remove();
                        foundCart.totalprice -= foundItem.unitPrice;
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
            req.flash('error', "There are something wrong!");
            res.redirect('/');
        }
        else{
            req.flash('success', "Your review was deleted.");
            res.redirect('/');
        }
    })
})

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
