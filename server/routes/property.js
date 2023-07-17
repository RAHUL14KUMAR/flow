const express=require('express');
const { getProperty, postProperty, getPropertyById,findPostedByParticularId } = require('../controllers/PropertyController');
const router=express.Router();

router.route('/')
.get(getProperty)
.post(postProperty)

router.route('/userprop')
.get(findPostedByParticularId)

router.route('/:id')
.get(getPropertyById)

module.exports=router;