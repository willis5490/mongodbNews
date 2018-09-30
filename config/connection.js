import { SSL_OP_NO_TICKET } from "constants";

const mongoose = require("mongoose");

export const MONGODB = "mongodb://localhost/mongoHeadlines";

if(process.env.MONGODB_URI){
    mongoose.connect(process.env.MONGODB_URI)
}else{
    mongoose.connect(MONGODB)
}

 mongoose.Promise = Promise;
 mongoose.connect(MONGODB_URI);

 const db = mongoose.connection

 db.on('error', (err)=>{
     console.log(`mongoose error: ${err}`)
 })
 db.once('open', ()=>{
     console.log(`mongoose connection successful!`)
 })