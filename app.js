const   express         =   require("express"),
        app             =   express(),
        bodyParser      =   require("body-parser"),
        mongoose        =   require("mongoose"),
        passport        =   require('passport'),
        LocalStrategy   =   require('passport-local'),
        Products        =   require('./models/product'),
        Review          =   require('./models/review'),
        User            =   require('./models/user'),
        seedDB          =   require('./seed.js');

mongoose.connect('mongodb://localhost/PalmShop');
app.set("view engine", "ejs");
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({extened: true}));
seedDB();

app.use(require('express-session')({
    secret: 'secret word',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/", function(req, res){ // ส่งข้อมูลของสินค้าไปเเสดงใน forEach 
    Products.find({}, function(err, allproducts){  // หาข้อมูลที่อยู่ใน database เพื่อส่งไปเเสดงผล
        if(err){
            console.log(err);
        }
        else{
            res.render("landing.ejs", {products: allproducts});
        }
    });
});

app.get("/new", function(req, res){ // ส่งไปหน้าเพิ่มสินค้า ( Add Product )
    res.render("product/new.ejs");
});

app.post("/", function(req, res){ // รับข้อมูลจาก form ที่เพิ่มสินค้า มาเเสดงผล สินค้า ( หน้าเเรก )
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

app.get("/:id", function(req, res){ // ส่งข้อมูล id ไปเเสดงผลข้อมูล (รายละเอียดของสินค้า)
    Products.findById(req.params.id).populate('reviews').exec(function(err, foundProduct){
        if(err){
            console.log(err);
        }
        else{
            res.render("product/viewMore.ejs", {product : foundProduct});
        }
    });
});

app.get("/:id/reviews/new", function(req, res){ // ส่งข้อมูล id ไปหน้าเพิ่ม Review
    Products.findById(req.params.id, function(err, foundProduct){
        if(err){
            console.log(err);
        }
        else{
            res.render("reviews/new.ejs", {product : foundProduct})
        }
    });
}); 


app.post("/:id/reviews", function(req, res){ // รับข้อมูลจาก form ที่เพิ่ม review มาเเสดงผล review ( หน้าเเสดงรายละเอียดสินค้า )
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
                    foundProduct.reviews.push(review);
                    foundProduct.save();
                    res.redirect("/"+foundProduct._id);
                }
            });
        }
    });
});         

app.get('/register', function(req, res){    // สร้าง rout ไปหน้า register
    res.render("register.ejs");
});

app.get('/login', function(req, res){    // สร้าง rout ไปหน้า login
    res.render("login.ejs");
});



app.listen(3000, function(){    // เปิด server รับ port 3000
    console.log("Server Activated.");
});

