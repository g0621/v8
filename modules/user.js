var mongo = require('mongoose');
var pasportlocalmongo = require('passport-local-mongoose');

var userschema = new mongo.Schema({
    username  : String,
    password : String
});

userschema.plugin(pasportlocalmongo);

module.exports = mongo.model('yelpUser',userschema);