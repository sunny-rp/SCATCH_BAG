const mongoose = require("mongoose")
const config = require("config")
const dbgr = require("debug")("development:mongoose")

mongoose.connect(`${config.get("MONGOBD_URI")}/scatch`)
.then(function(){
    dbgr("connected");
    
})
.catch(function(err){
    console.log(err);
    
})

module.exports = mongoose.connection