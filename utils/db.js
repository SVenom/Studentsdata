const mongoose = require("mongoose")
const MONGODBURI = "mongodb+srv://Susovan7:Susovan2000@cluster0.jngsb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const MongoConnect = ()=>{
    mongoose.connect(MONGODBURI,()=>{
        console.log("Connect to mongo");
    })
}
module.exports = MongoConnect;