const express = require('express');
const router = new express.Router();
const adminAppartModel = require('../../models/appartamentiModel');

// api that returns json data 

router.get('/', (req,res) => {
   adminAppartModel.find({}).sort({ internalName : 1})
        .then((data)=>{
        res.json(data);
        
        })
        .catch((err)=>{
        console.log(err);
        res.send('error');
        });

});
module.exports = router;