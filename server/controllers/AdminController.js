const asyncHandler=require('express-async-handler');
const Property=require('../modals/propertySchema');
const dotenv=require("dotenv");
dotenv.config();

const mailgun = require('mailgun-js')({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  });


const propertyViewForAdmin=asyncHandler(async(req,res)=>{
    try{
        const prop=await Property.find({});
        if(prop){
            let a=[];
            for(let i=0;i<prop.length;i++){
                if(!prop[i].isverified){
                    a.push(prop[i]);
                }
            }
            console.log(a);
            return res.status(200).json(a);
        }
        else{
            res.status(404).json({"message":"property not found"})
        }
    }catch(error){
        res.status(500).json({"message":error});
    }
})

const propertyVerification=asyncHandler(async(req,res)=>{
    try{
        const prop=await Property.findById(req.params.id);
        if(prop){
            await prop.updateOne({$set:req.body},{new:true})
            res.status(200).json("property is verified");
        }
    }catch(error){
        res.status(500).json({"message":error});
    }
})
const propertyRejected=asyncHandler(async(req,res)=>{
    try{
        const prop=await Property.findById(req.params.id);
        const {userEmail}=req.body;
        if(prop){
            // mailer(userEmail);
            res.status(200).json("email sent")
        }else{
            res.status(404).json("property not found");
        }
    }catch(error){
        res.status(500).json({"message":error});
    }
})
const mailer=async(email)=>{

    let mailOptions = {
        from: process.env.COMPANY_MAIL,
        to: email,
        subject: 'regarding your property submittion',
        text:'your property post is being rejected',
      };
      
    mailgun.messages().send(mailOptions, (error, body) => {
        if (error) {
          console.log(error);
        } else {
          console.log(body);
        }
    });
}
module.exports={
    propertyViewForAdmin,
    propertyVerification,
    propertyRejected
}