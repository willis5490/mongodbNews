const mongoose = require("mongoose");

export const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
 mongoose.Promise = Promise;
 mongoose.connect(MONGODB_URI);
