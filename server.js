//Dependencies
let express = require('express');
let mongoose = require('mongoose');
let axios = require('axios');
let cheerio = require('cheerio');
 
//Require all models
let db = require('/models');

var PORT = process.env.PORT || 3500;

//Initialize Express
var app = express();

//Middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

//Connection to mongoDB
mongoose.connect('mongodb:https://jdmongo.herokuapp.com/', {usernewUrlParser: true});

//Routes
app.get('/scrape', function(req, res){
    axios.get('http://time.com/section/sports/').then(function(response){
        let $ = cheerio.load(response.data);

        $('').each(function(i, element){
            var result = {};

            result.title = $(this)
                .children('h3 class')
                .text();
            result.link = $(this)
                .children('a')
                .attr('href');
            db.Article.create(result)
                .then(function(dbArticle){
                    console.log(dbArticle);
                })
                .catch(function(err){
                    console.log(err);
                });
        });
        res,send('Done Scraping')
    });
});

app.get('/articles', function(req, res){
    db.Article.find({})
        .then(function(dbArticle) {
            res.join(dbArticle);
        })
        .catch(function(err){
            res.join(err);
        });
});

app.get('/articles/:id', function(req, res){
    db.Article.findOne({_id: req.params.id})
        .populate('note')
        .thn(function(dbArticle){
            res.json(dbArticle);
        })
        .catch(function(err){
            res.json(err)
        })
});

app.post('/articles/:id', function(req, res){
    db.Note.create(req.body)
    .then(function(dbNote){
        return db.Article.findOneandUpdate(
        { _id: req.params.id }, 
        {note: dbNote._id}, 
        {new:true})
    })
    .then(function(dbArticle){
    res.join(dbArticle);
    })
    .catch(function(err){
        res.join(err)
    });
});

app.listen(PORT, function(){
    console.log("App is running on port " + PORT + '!');
});