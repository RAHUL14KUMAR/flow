const mongoose=require("mongoose");
const dotenv=require("dotenv");
dotenv.config();

const url=process.env.MONGO_DB;

const connect=mongoose.connect(process.env.MONGO_DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

connect.then((db)=>{
    console.log("mongodb is connected sucessfully")
},(err)=>{
    console.log("we get error from mongoose connnection",err)
})