const express=require("express")
const router=express.Router()
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const UserDB=require("../models/users")

require("dotenv").config()


router.post("/signup",async(req,res)=>{
    const email=req.body.email
    const username=req.body.username
    const password=req.body.password
    if(!email|| !username || !password){
        return res.status(500).json({msg:"Fill all the credentials"})
    }
     
    //check if user exists in db
    let existingUser= await UserDB.findOne({$or:[{email}, {username}]})
    if(existingUser){
        res.status(400).json({msg:"User already exists"})
        return
    }
    let User=await new UserDB({email,username,password})
    //Encrypt the password
    const salt =await bcrypt.genSalt(11);
    const EncyPass= await bcrypt.hash(password,salt)

    //Update the password
    User.password=EncyPass;
    
    //save the user in database
    User=await User.save()
    
    //create the jwt token
    payload={
        userID:User.id,
        username
    }
    try{
        const token=await jwt.sign(payload,process.env.SECRET_CODE,{expiresIn:3600})
        console.log(token)
        res.status(200).json({msg:"OK",token:token})
        return

    }catch(e){
        res.status(500).json({msg:"Error generating token"})
    }
    
    })

router.post("/login",async(req,res)=>{
    const username=req.body.username
    const password=req.body.password
    if(!username || !password){
        return res.status(400).json({msg:"Fill all the credentials"})
    }
    try{
        let User= await UserDB.findOne({ username})
        if(!User){
            return res.status(400).json({msg:"No User Found"})
        }
        
        //check the password
        let check=await bcrypt.compare(password,User.password)
        if(!check){
            return res.status(400).json({msg:"Wrong Password"}) 
        }
        //create the jwt token
        payload={
            userID:User.id,
            username
        }
        
        const token=await jwt.sign(payload,process.env.SECRET_CODE,{expiresIn:3600})
        return res.status(200).json({
            msg:"Ok",
            token
        })
    }catch(e){
        res.status(500).json({msg:"An error occured during the token generation"})
    }})

module.exports=router