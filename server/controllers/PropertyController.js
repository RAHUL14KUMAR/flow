const asyncHandler=require('express-async-handler');
const Property=require('../modals/propertySchema');


const getProperty=asyncHandler(async(req,res)=>{
    try{
        const prop=await Property.find({});
        if(prop){
            let a=[];
            for(let i=0;i<prop.length;i++){
                if(prop[i].isverified){
                    a.push(prop[i]);
                }
            }
            console.log(a);
            return res.status(200).json(a);
        }
        else{
            res.status(404).json({"message":"property not found"})
        }
        // res.status(200).json(prop);
    }catch(error){
        res.status(500).json({"message":error});
    }
})

const postProperty=async(req,res)=>{
    try{
        const createdProperty = await Property.create(req.body);
        console.log(createdProperty);
        res.status(200).json("Property has been posted");
    }catch(error){
        console.log(error);
        res.status(500).json({"message":error});
    }
}


const getPropertyById=asyncHandler(async(req,res)=>{
    try{
        const prop=await Property.findById(req.params.id);
        if(prop.isverified){
            res.status(200).json(prop)
        }
        else if(!prop.isverified){
            res.status(200).json("in the verification process");
        } 
        else{
            res.status(404).json({"message":"property not found"})
        }
    }catch(error){
        res.status(500).json({"message":error});
    }
})
const findPostedByParticularId=asyncHandler(async(req,res)=>{
    try{
        const {userid}=req.body;
        const prop=await Property.find({userid:userid});
        if(prop){
            res.status(200).json(prop)
        }
    }
    catch(error){
        console.log(error)
        res.status(500).json({"message":error});
    }
})
module.exports={
    getProperty,
    postProperty,
    getPropertyById,
    findPostedByParticularId
}