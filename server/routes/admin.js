const express=require('express');
const { propertyViewForAdmin, propertyVerification, propertyRejected } = require('../controllers/AdminController');
const router=express.Router();

router.route('/')
.get(propertyViewForAdmin)

router.route('/:id')
.put(propertyVerification)
.get(propertyRejected)

module.exports=router;