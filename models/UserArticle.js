var mongoose = require("mongoose");

var Schema = mongoose.Schema;


var UserArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  
  link: {
    type: String,
    required: true
  },

  pic:{
    type: String
  },

  note: {
    type:String
  }
});


var UserArticle = mongoose.model("UserArticle", UserArticleSchema);

module.exports = UserArticle;