var Campground = require('../modules/campground');
var Comment    = require('../modules/comment');

var exp =  require('express');
var router = exp.Router({mergeParams : true});

router.get('/new',isLoggedIn,function (req,res) {
    Campground.findById(req.params.id,function (err,camp) {
        if (err) console.log(err);
        else {
            console.log(camp);
            res.render('comment/new',{campgrnd : camp});
        }
    });

});

router.post('/',isLoggedIn,function (req,res) {
    Campground.findById(req.params.id,function (err,camp) {
        if(err) console.log(err);
        else {
            req.body.comment.body = req.sanitize(req.body.comment.body);
            Comment.create(req.body.comment,function (err,comment) {
                comment.author.id =  req.user._id ;
                comment.author.username =  req.user.username;
                comment.save();                                       //because our camp model was
                camp.comment.push(comment);                           // mase with reference to comment database.
                camp.save();
                console.log(comment);
                res.redirect('/campground/'+req.params.id);
            });
        }
    });
});

function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}
module.exports = router ;