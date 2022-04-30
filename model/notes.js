const mongoose = require("mongoose")
const {Schema} = mongoose

const NoteSchema = new  Schema({
   email:{
    type: String,
    required:true
   },
   document:{
       type:String,
       required: true,
   },
   subject:{
       type:String,
       required: true
   },

})

module.exports = mongoose.model("Notes",NoteSchema)