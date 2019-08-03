const express = require('express');
const router = new express.Router();
const mongoose = require('mongoose');
const appartModel = require('../../models/appartamentiModel');


// return json data of all appart with at least one room available
router.get('/', (req,res) => {
    const today = new Date();
    appartModel.find({"rooms.contracts": {$elemMatch:{outDate :{$lt : today}}}})
        .then((data)=>{
        res.json(data);
        })
        .catch((err)=>{
        console.log(err);
        res.send('error');
        });

});
module.exports = router;