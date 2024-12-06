const mongoose = require("mongoose")


let userSchema=new mongoose.Schema({
    Name : {
        type : String,
        required : true 
    },
    Email : {
        type : String,
        required : true 
    },
    Password : {
        type : String,
        required : true 
    },
    userTasks:{
         type:[{
               Task:{
                  type:String,
                  required:true
                },
               isComplete:{
                 type:Boolean,
                 required:true
               },
               TaskCreatedAt:{
                   type:Date,
                   default:Date.now
               }
         }],
         required:false
    }
  
})

module.exports =  mongoose.model("user", userSchema)