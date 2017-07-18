var exp         = require('express');
var bodyparser  = require('body-parser');
var mongo       = require('mongoose');
var app         = exp();
var santize     = require('express-sanitizer');
var passport    = require('passport');
var localstr    = require('passport-local');
var passportlocalmong = require('passport-local-mongoose');
var seedDB      = require('./seeds');
//seedDB();

var commentRoute = require('./routes/comment');
var campRoute   = require('./routes/campground');
var indexRoute = require('./routes/index');



var User = require('./modules/user');

app.use(require('express-session')({
    secret : 'physics55',
    resave : false,
    saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localstr(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


mongo.connect('mongodb://localhost/demo',{useMongoClient: true});
app.set("view engine","ejs");
app.use(exp.static("public"));
app.use(bodyparser.urlencoded({extended:true}));
app.use(santize());

app.use(function (req,res,next) {
   res.locals.cuser = req.user;
   next();
});

app.use(indexRoute);
app.use('/campground',campRoute);
app.use('/campground/:id/comment',commentRoute);




app.listen(3000);