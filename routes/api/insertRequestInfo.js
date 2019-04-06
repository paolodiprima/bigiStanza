const express = require('express');
const router = new express.Router();
const mongoose = require('mongoose');
const infoRequest = require('../../models/infoRequestModel');

var uri2 = "mongodb://paoloDemoAtlas:***REMOVED***@cluster0-shard-00-00-0ega5.azure.mongodb.net:27017,cluster0-shard-00-01-0ega5.azure.mongodb.net:27017,cluster0-shard-00-02-0ega5.azure.mongodb.net:27017/BGStanza?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true"
var uri = "mongodb+srv://paoloDemoAtlas:***REMOVED***@cluster0-0ega5.azure.mongodb.net/BGStanza?retryWrites=true"

mongoose.connect(uri2,function(err){
   
    if (err) {
    console.log ('ERROR connecting to: ' + uri + '. ' + err);
    } else {
    console.log ('Succeeded connected to: ' + uri); 
    }
  });

router.post('/', (req,res) => {

     async function addInfoRequest() {
        const newInfoRequest = new infoRequest({
            name : req.body.name,
            surname: req.body.cognome,
          //  dob: new Date(1975,10,11),
            email: req.body.email,
            job: req.body.job,
            inDate: req.body.entrata,
            outDate: req.body.uscita,
            msg: req.body.msg
        });
        const result = await newInfoRequest.save();
        res.send(result);
    }   
    addInfoRequest();
});
module.exports = router;