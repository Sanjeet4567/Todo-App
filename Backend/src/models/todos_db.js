const mongoose=require("mongoose")
const todosSchema= new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    todo:{
        type: Object,
        required: [true,"Why no Todo"],
        value:{
            type: String,
            required: true,
        },
        status:{
            type: String,
            enum: ["Pending", "Completed" , "Delayed"],
            default: "Pending",
            required: true,
        },
        creationDate:{
            type:Date,
            required: true,
            
        },
        deadline:{
            type:Date,
            required: true,
        },
    }
})
const todosModel=mongoose.model("UserTodos",todosSchema);
module.exports=todosModel;