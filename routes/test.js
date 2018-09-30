const cheerio = require("cheerio");

const request = require("request");

request("https://www.cnn.com/articles", function(error, response, html) {

    var $ = cheerio.load(html);
  
    var results = [];
  
    $(".cd__wrapper").each(function(i, element) {
  //good to go for article heading/summary
  const articleTitle = $(element).find('.cd__headline-text').text();
  const articleLink = $(element).find('a').attr("href");
  const fullArticleLink = (`https://www.cnn.com${articleLink}`)
 const articlePic = $(element).find('.media__image').attr('data-src-large')
    console.log(articlePic +"\n")
    });
});

