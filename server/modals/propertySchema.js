const mongoose=require("mongoose");
const Schema=mongoose.Schema

const ownerSchema=new Schema({
    name:{
        type:String,
    },
    phone:{
        type:String
    },
    email:{
        type:String,
    },
    address:{
        type:String,
    },
    idProof:{
        type:String,
    },
})
const propertySchema=new Schema({
    name:{
        type:String
    },
    address:{
        type:String
    },
    city:{
        type:String
    },
    type:{
        type:String
    },
    isverified:{
        type:Boolean,
        default:false,
    },
    imgUrl:{
        type:String,
    },
    description:{
        type:String
    },
    sqrft:{
        type:Number
    },
    price:{
        type:Number
    },
    pricepersqrft:{
        type:Number
    },
    ownerDetails:[ownerSchema]
},{
    timestamps:true
})
module.exports=mongoose.model("Property",propertySchema);