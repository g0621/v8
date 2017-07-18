var mongo = require('mongoose');
var comment = require('./comment');

var campSchema = mongo.Schema({
    name : String,
    year : Number,
    image : String,
    disc : String,
    author : {
        id : {
            type : mongo.Schema.Types.ObjectId,
            ref : 'yelpUser'
        },
        username : String
    },
    comment : [
        {
            type : mongo.Schema.Types.ObjectId,
            ref : 'comment'
        }
    ]
});

module.exports = mongo.model('campground',campSchema);