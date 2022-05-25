const   express         =   require("express"),
        app             =   express(),
        bodyParser      =   require("body-parser"),
        mongoose        =   require("mongoose"),
        passport        =   require('passport'),
        LocalStrategy   =   require('passport-local'),
        flash           =   require('connect-flash'),
        methodOverride  =   require('method-override'),
        Products        =   require('./models/product'),
        Review          =   require('./models/review'),
        User            =   require('./models/user'),
        Cart            =   require('./models/cart'),
        seedDB          =   require('./seed.js'),
        session         =   require('express-session');

const   indexRoutes     =   require('./routes/index'),
        productRoutes   =   require('./routes/product'),
        reviewRoutes    =   require('./routes/reviews');

mongoose.connect('mongodb://localhost/PalmShop');
app.set("view engine", "ejs");
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({extened: true}));
app.use(methodOverride('_method'));
app.use(flash());
seedDB();


app.use(require('express-session')({
    secret: 'secret word',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    res.locals.session = req.session;
    next();
});

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.use('/', indexRoutes);
app.use('/:id/reviews', reviewRoutes);
app.use('/', productRoutes);




app.listen(3000, function(){    // เปิด server รับ port 3000
    console.log("Server Activated.");
});

