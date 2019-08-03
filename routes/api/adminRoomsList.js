const express = require('express');
const router = new express.Router();
const mongoose = require('mongoose');
const appartModel = require('../../models/appartamentiModel');

// return array rooms from appartment id

router.get('/:appartid', (req,res) => {

    var id = req.params.appartid;
    
    // find appartment by id
    appartModel.findById(id)
        .then((data)=>{
            
        // return array of rooms
            res.send({ "appartId": data.internalName , "rooms": data.rooms});  
  
        })
        .catch((err)=>{
            console.log("ERRORE",err);
            res.send('error',err);
        });

});
module.exports = router;