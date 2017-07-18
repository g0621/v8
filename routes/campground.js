var Campground = require('../modules/campground');
var Comment    = require('../modules/comment');
var exp = require('express');
var router =  exp.Router();

router.get('/',function (req,res) {
    Campground.find({},function (err,camp) {
        if (err) console.log('ERROR\n' + err);
        else res.render('campground/campground',{camp:camp});
    });
});
router.post('/',isLoggedIn,function (req,res) {
    Campground.create(req.body.cmp,function (err,camp) {
        if (err) console.log('ERROR\n' + err);
        else{
            camp.author.id = req.user._id;
            camp.author.username = req.user.username;
            camp.save();
            console.log(camp);
        }
    });
    res.redirect('/campground');
});
router.get('/new',isLoggedIn,function (req,res) {
    res.render('campground/new');
});

router.get('/:id',function (req,res) {
    Campground.findById(req.params.id).populate('comment').exec(function (err,camp) {
        if(err) console.log(err);
        else {res.render('campground/show',{camp:camp});}
    });
});

function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports =  router;