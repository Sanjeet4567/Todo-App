const express=require("express")
const cors=require("cors")
const bodyParser=require("body-parser")
const router=require("./app")
require("dotenv").config()

const app=express();

app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use("/",router)

const port=process.env.PORT||8080
app.listen(port,()=>{
    console.log(`App running on port: ${port}`)
});

