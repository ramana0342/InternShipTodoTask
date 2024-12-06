const express = require("express");
const router = express.Router();
const userSchema = require("../Model/user");
let jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { ObjectId } = mongoose;

// Add Task Router

router.put("/addTask", async (req, res) => {
  let token = req.headers.authorization;
//  console.log(req.body)
  let tokenResult = jwt.verify(token, "Shh");
  const user = await userSchema.findById(tokenResult.userID)
  let taskObject={
        Task:req.body.Task,
        isComplete:0,    
  }
  user.userTasks.push(taskObject)
  let result = user.save()
 // console.log(user)
  res.json({
        result
  })
})

// Get Task Router

router.get("/getUserTasks", async (req, res) => {
  let token = req.headers.authorization;
  let tokenResult = jwt.verify(token, "Shh");
  let userData = await userSchema.findById(tokenResult.userID)
  let Data= userData.userTasks

  return res.json({
          Data
  })
})

// Update Task Router

router.put("/UpDataTask/:id", async (req, res) => {
 // console.log(req.body)
  let token = req.headers.authorization;
  let tokenResult = jwt.verify(token, "Shh");
  let userData = await userSchema.findById(tokenResult.userID)
 // console.log(userData)
  let TaskId = req.params.id
  userData.userTasks = userData.userTasks.map((item,index)=>{
                 if(item._id == TaskId){
               return {...item,Task:req.body.Task}
                 }
                 return item
  })
  userData.save()
 // console.log(userData.userTasks)
  return res.json({
    Success: "Task Was Updated in DB" 
  })
})

// Delete Task Router

router.delete("/DeleteTask/:id", async (req, res) => {
  let token = req.headers.authorization;
  let tokenResult = jwt.verify(token, "Shh");
  let userData = await userSchema.findById(tokenResult.userID)
  let TaskId = req.params.id
 // console.log(TaskId)
   userData.userTasks = userData.userTasks.filter((item,index)=>{
                          // console.log(item._id == TaskId)
                        if(item._id.toString() !== TaskId){
                                return true
                        }
   })
//  console.log( userData.userTasks)
   await userData.save()
  return res.json({
    Success: "Task Was deleted in DB"
  })
})


router.put("/taskStatus",async(req,res)=>{
  let token = req.headers.authorization;
  let tokenResult = jwt.verify(token, "Shh");
  let userData = await userSchema.findById(tokenResult.userID)
  userData.userTasks = userData.userTasks.map((item,index)=>{
    if(item._id == req.body.taskID){
         if(req.body.Status == "isCompeleted"){
              return {...item,isComplete:1}
         }else if(req.body.Status=="isNotCompeleted"){
              return {...item,isComplete:0}
         }
    }
    return item
})
await userData.save()
let result =userData.userTasks
return res.json({
         result
})
     
})


module.exports = router;