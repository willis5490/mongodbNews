var mongoose = require("mongoose");

var Schema = mongoose.Schema;


var ArticleSchema = new Schema({
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
    type: Schema.Types.ObjectId,
    ref: "Note",
    trim: true
  },
  lastUpdated:{
    type: Date,
    default: Date.now
  }
});


var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;

