const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    username:{
        type:String,
    },
    email:{
        type:String,
    },
    profilePicture:{
        type:String,
    },
    age:{
      type: Number,  
    },
    followers:[],
    following:[]
},{
    timestamps:true
})
module.exports=mongoose.model("User",userSchema);