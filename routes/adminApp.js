const express = require('express');
const router = new express.Router();
const checkAuth = require('../middleware/checkAuth');
const adminAppartModel = require('../models/appartamentiModel');

// return json data of all appart for admin list of appartments
router.get('/',checkAuth, (req,res) => {
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