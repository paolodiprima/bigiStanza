const express = require('express');
const router = new express.Router();
const mongoose = require('mongoose');
const adminAppartModel = require('../../models/appartamentiModel');

// api that returns json data of all appart 

router.get('/', (req,res) => {
    const today = new Date();
    adminAppartModel.find({})
        .then((data)=>{
        res.json(data);
        
        })
        .catch((err)=>{
        console.log(err);
        res.send('error');
        });

});
module.exports = router;