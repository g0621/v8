var mongo = require('mongoose');

var commentSchema = mongo.Schema({
    text : String,
    author : {
        id : {
            type : mongo.Schema.Types.ObjectId,
            ref : 'yelpUser'
        },
        username : String
    }
});

module.exports = mongo.model('comment',commentSchema);