const  express=require("express");
const app=express();
const port= 8080;
const mongoose=require("mongoose");
const userRoutes= require("./API Views/users")
const TaskRoutes= require("./API Views/Tasks")
const cors=require("cors")


app.use(cors());
app.use(express.json());
app.use(userRoutes);
app.use(TaskRoutes)



mongoose.connect("mongodb+srv://ramanareddym0342:Ramana799@todotaskdata.rekk1.mongodb.net/?retryWrites=true&w=majority&appName=TodoTaskData")
.then(()=>{
   console.log("DB Connected")
})


app.listen(port, ()=>{
    console.log(`server started running in ${port}`)
})

