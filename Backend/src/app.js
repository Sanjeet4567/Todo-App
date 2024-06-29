var express=require("express")
const auth=require("./routes/auth")
const Todos=require("./routes/todos")
const mongoose=require("mongoose")
var router=express.Router()

require("dotenv").config()
try{
    mongoose.connect(process.env.DB_URI)
}catch(e){
    console.log("Database Connection Failure");
}

router.get("/",(req,res)=>{
    res.send("Hello welcome to Todo App")
})

router.use("/auth",auth)
router.use("/apis",Todos)

module.exports=router;