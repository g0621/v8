var Campground = require('../modules/campground');
var Comment    = require('../modules/comment');

var passport = require('passport');
var User = require('../modules/user');

var exp = require('express');
var router = exp.Router();

router.get("/",function (req,res) {
    res.render("landing");
});


router.get('/register',function (req,res) {
    res.render('register');
});

router.post('/register',function (req,res) {
    User.register(new User({username : req.body.username}),req.body.password,function (err,user) {
        if(err) console.log(err);
        else {
            passport.authenticate('local')(req,res,function () {
                res.redirect('/campground');
            });
        }
    });
});

router.get('/login',function (req,res) {
    res.render('login');
});

router.post('/login',passport.authenticate("local",{
    successRedirect : '/campground',
    failureRedirect : '/login'
}),function (req,res) {

});

router.get('/logout',function (req,res) {
    req.logOut();
    res.redirect('/');
});

function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = router;