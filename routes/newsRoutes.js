const express = require("express");
const router = express.Router()
const cheerio = require("cheerio");
const mongoose = require("mongoose");
const request = require("request");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/newsArticles";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

var db = require("../models");

router.get('/', (req, res) => {
  res.render('index')
});

router.get('/scrape', (req, res) => {
  request("https://www.cnn.com/articles", function (error, response, html) {

    var $ = cheerio.load(html);

    var results = {};

    $(".cd__wrapper").each(function (i, element) {
      //good to go for article heading/summary
      const articleTitle = $(element).find('.cd__headline-text').text();
      const articleLink = $(element).find('a').attr("href");
      const fullArticleLink = (`https://www.cnn.com${articleLink}`)
      const articlePic = $(element).find('.media__image').attr('data-src-large')

      results.title = articleTitle;
      results.link = fullArticleLink;
      results.pic = articlePic;
     


      db.Article.create(results)
        .then((dbArticle) => {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch((err) => {
          // If an error occurred, send it to the client
          return res.json(err);
        });
        
    });
   res.redirect('/scrapedArticles')
  });
});

router.get('/scrapedArticles', (req, res) => {

  const data = {
    articleData: [],
}
  db.Article.find({}).sort({lastUpdated: 1})
  .then((allArticles) => {
    for (var i = 0; i <allArticles.length; i++){
      data.articleData.unshift(allArticles[i])
  }
  res.render('index', data);
  })

});

router.get('/userArticles/:id', (req, res) => {
  const savedArticles = req.params.id
  console.log(savedArticles)
  const results = {};
 
  db.Article.find({_id: savedArticles})
  .then((saved) => {
    console.log(saved)
    results.title = saved[0].title;
    results.link = saved[0].link;
    results.pic = saved[0].pic; 
    results.lastUpdated = Date;

    db.UserArticle.create(results)
    .then((dbArticle) => {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch((err) => {
          // If an error occurred, send it to the client
          return res.json(err);
        });
    
  })
  res.redirect("/scrapedArticles")
});

router.get('/savedArticles',(req,res)=>{

  const data = {
    articleData: [],
}

  db.UserArticle.find({}).sort({lastUpdated: 1})
  .then((allArticles) => {
    for (var i = 0; i <allArticles.length; i++){
      data.articleData.unshift(allArticles[i])
  }
  res.render('userindex', data);
  })  
})

router.get('/delete/:id',(req,res)=>{
  const deletedArticle = req.params.id;
  console.log(deletedArticle)
  db.UserArticle.deleteOne({_id: deletedArticle})
  .then((deleted)=>{
    console.log(deleted)
  })
res.redirect('/savedArticles')
})

// *****************************************************

//make button to get all notes associated with article
router.post("/notes1/:id", function(req, res) {
 const test = req.body.note;
 const ider = req.params.id;
 console.log(ider)
 console.log(test);

  db.UserArticle.findOneAndUpdate({_id: req.params.id }, {note:test},{ new: true })
    .then((dbArticle)=> {
      console.log(dbArticle)
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

router.get("/notes/:id",(req,res)=>{

  const pata = {
    articleData: [],
}

  const id = req.params.id;
  db.UserArticle.find({_id: id})
  .then((data)=>{
    for (var i = 0; i <data.length; i++){
      pata.articleData.push(data[i])
  }
  res.render('notes', pata)
  })
});


router.get('/noteDeleter/:id',(req,res)=>{
  const deletedNote = req.params.id;

  db.UserArticle.findOneAndUpdate({_id: deletedNote }, {note:'There are no notes'},{ new: true })
  .then((dbArticle)=> {
    res.redirect('/savedArticles')
  })
  .catch(function(err) {
    // If an error occurred, send it to the client
    res.json(err);
  });
 
})



module.exports = router