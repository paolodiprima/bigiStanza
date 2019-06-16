const express = require('express');
const router = new express.Router();
const mongoose = require('mongoose');
const appartModel = require('../models/appartamentiModel');

router.get('/:appartid', (req,res) => {

    var id = req.params.appartid;
    
    // find apparment that refer to room selected
    appartModel.findById(id)
        .then((data)=>{
            
            const dataJSON = JSON.parse(JSON.stringify(data));
            res.render('stanze',{appart:dataJSON}); //pass obj with appartmes selected
  
        })
        .catch((err)=>{
            console.log("ERRORE",err);
            res.send('error',err);
        });
});
module.exports = router;