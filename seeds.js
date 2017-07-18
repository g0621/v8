var mongo       = require('mongoose');
var campground  = require('./modules/campground');
var comment     = require('./modules/comment');

var data = [
    {
        name : "Ghorra Camp",
        year : 2016,
        image : 'https://images.pexels.com/photos/464412/pexels-photo-464412.jpeg?h=350&auto=compress&cs=tinysrgb',
        disc : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },{
        name : "Bhoot Bangla",
        year : 1789,
        image : 'https://images.pexels.com/photos/464383/pexels-photo-464383.jpeg?h=350&auto=compress&cs=tinysrgb',
        disc : "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
    },{
        name : "Khula Asman",
        year : 1596,
        image : 'https://images.pexels.com/photos/464394/pexels-photo-464394.jpeg?h=350&auto=compress&cs=tinysrgb',
        disc : "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable."
    },{
        name : "Battak ka bacha",
        year : 2019,
        image : 'https://images.pexels.com/photos/464352/pexels-photo-464352.jpeg?h=350&auto=compress&cs=tinysrgb',
        disc : "unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore"
    }
];

function seedDB() {
    campground.remove({},function (err) {            //inside the call back so that it runs after
        if(err) console.log(err);                    // all pic are removed.
        else {
            data.forEach(function (camp) {
                campground.create(camp,function (err,camp) {
                    if(err) console.log(err);
                    else {
                        comment.create({
                            text : 'This is nice camp ground, but ....',
                            author : 'charlie'
                        },function (err,comment) {
                            if (err) console.log(err);
                            else {camp.comment.push(comment);camp.save();}
                        });
                    }
                });
            });
        }
    });
}


module.exports = seedDB;