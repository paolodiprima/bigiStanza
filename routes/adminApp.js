const express = require('express');
const router = new express.Router();
const mongoose = require('mongoose');
const adminAppartModel = require('../models/appartamentiModel');

// return json data of all appart 
router.get('/', (req,res) => {
    adminAppartModel.find({})
        .then((data)=>{
            res.render('adminAppart',{appartList:data});
        })
        .catch((err)=>{
            console.log(err);
            res.send('error');
        });

});
module.exports = router;