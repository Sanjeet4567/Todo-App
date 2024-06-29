const mongoose=require("mongoose")
const usersSchema= new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    }
})
const usersModel=mongoose.model("User",usersSchema);
module.exports=usersModel;