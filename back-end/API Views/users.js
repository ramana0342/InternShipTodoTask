const express= require("express");
const router= express.Router();
 const  userSchema= require("../Model/user")

 let bcrypt= require("bcrypt")
 let jwt = require("jsonwebtoken")



 router.post("/register",async(req,res)=>{

    let {Name,Email,Password} = req.body;
    if(Name&&Email&&Password){
      let existUser = await userSchema.findOne({Email:Email});
      if(existUser==null){
      let encryptPassword= bcrypt.hashSync(Password,10);
      req.body.Password = encryptPassword
       let user=new  userSchema(req.body);
       let userDetails = await user.save();
  
       return res.json({
          Success : "User Stored in DB",
          userDetails
       })
      }else{
         return res.json({
            ERROR:"Already Hava An Account On This Email ID"
         })
       }
    }else{
       return res.json({
         ERROR:"Enter All Details"
       })
    }
    
    
    }); 

 router.post("/login",async(req,res)=>{
   let {Email,Password} = req.body;
   if(Email&&Password){
   let userDetails= await userSchema.findOne({Email:Email});
   if(userDetails==null){
      return res.json({
         Error:"No User is  Registered with this Email"
      })
   }
     let passwordResult  = bcrypt.compareSync(Password,userDetails.Password);
   if(passwordResult == false){
      return res.json({
         Error:"Incorrect password"
      })
   }

   let token = jwt.sign({userID:userDetails._id},"Shh")
   return res.json({
      Success : "Login Success",
      Token : token
   })

}else{
   return res.json({
      Error:"Enter All Details"
   })
}

   
 });

 module.exports=router;