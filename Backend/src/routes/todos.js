const router=require("express").Router()
const todos_db=require("../models/todos_db")
const jwt=require("jsonwebtoken")
require("dotenv").config()

// check if the header contains the token
const checkToken=(req,res,next)=>{
    
    const header=req.headers["authorization"]
    
    if(header){
        const bearer=header.split(" ")
        const token=bearer[1]
        req.token=token
        next()
    }else{
        return res.status(403).json({msg:"UnAuthorized access"})
    }
}

//verify the token and get the username
const getUser=async(req,res,next)=>{
    //verify the token
    try{
    const verified=await jwt.verify(req.token,process.env.SECRET_CODE)
    req.username=verified.username;
    next()
    }catch(err){
        return res.status(403).json({msg:"Invalid or Expired token:  Please Login again"})
    }  
}
//create todo
router.post("/create",checkToken,getUser,async (req,res)=>{
    if(!req.username|| !req.body.value || ! req.body.deadline){
        return res.status(400).json({msg:"Fill all the required feilds"})
    }
    const todo=new todos_db({
        username:req.username,
        todo:{
            val:req.body.value,
            status:req.body.status ?req.body.status: "Pending",
            creationDate:req.body.creationDate,
            deadline:req.body.deadline
        }
    })
    try{
        const resTodo=await todo.save()
        return res.status(200).json({msg:"Todo added successfully",data:resTodo})
    }catch(err){
        console.log(err);
        return res.status(500).json({msg:"Error while adding the todo"})
    }
})

//read all the todos
router.get("/todos",checkToken,getUser,async(req,res)=>{
    try{
        const todos=await todos_db.find({username:req.username}).sort({"todo.creationDate":-1})
        return res.status(200).json(todos)

    }catch(err){
        res.status(500).json({msg:"Error occurred while fetching todos"})
    }
})
//edit a todo
router.post("/todo/:id",checkToken,getUser,async(req,res)=>{
    if(!req.username|| !req.body.value || ! req.body.deadline){
        console.log("username:",req.username);
        console.log("value:",req.body.value);
        console.log("deadline:",req.body.deadline);
        return res.status(400).json({msg:"Fill all the required feilds"})
    }
    try{
        await todos_db.findByIdAndUpdate(req.params.id,{
            $set:{
                
                    "todo.val":req.body.value,
                    "todo.status":req.body.status ?req.body.status: "Pending",
                    "todo.deadline":req.body.deadline
                }
            
        })
        res.status(200).json({msg:`Successfully updated the todo with id:${req.params.id}`})
    }catch(err){
        res.status(500).json({msg:"Error occurred while updating todo"})
    }
})

//delete a todo
router.delete("/todo/:id",checkToken,getUser, async(req,res)=>{
    try{
        await todos_db.findByIdAndDelete(req.params.id)
        return res.status(200).json({msg:`Successfully deleted todo with id:${req.params.id}`})
    }catch(err){
        console.log(err);
        return res.status(200).json({msg:"Error while deleting the todo"})
    }
})
module.exports=router;