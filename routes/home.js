const express = require('express');
const router = new express.Router();
const mongoose = require('mongoose');
const appartModel = require('../models/appartamentiModel');

var uri2 = "mongodb://paoloDemoAtlas:***REMOVED***@cluster0-shard-00-00-0ega5.azure.mongodb.net:27017,cluster0-shard-00-01-0ega5.azure.mongodb.net:27017,cluster0-shard-00-02-0ega5.azure.mongodb.net:27017/BGStanza?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true"
var uri = "mongodb+srv://paoloDemoAtlas:***REMOVED***@cluster0-0ega5.azure.mongodb.net/BGStanza?retryWrites=true"

mongoose.connect(uri2,function(err){
    // console.log('callback executed!');
    if (err) {
    console.log ('ERROR connecting to: ' + uri + '. ' + err);
    } else {
    console.log ('Succeeded connected to: ' + uri); 
    }
  });


router.get('/', (req,res) => {
    const today = new Date();
    appartModel.find({"rooms.contracts": {$elemMatch:{outDate :{$lt : today}}}})
        .then((data)=>{
            
            const dataJSON = JSON.parse(JSON.stringify(data));
            console.log(dataJSON);
            res.render('index',{appartList:dataJSON});
    //  res.json(data);
        })
        .catch((err)=>{
            console.log(err);
            res.send('error',err);
        });
    //  res.render('index',{}); //passare oggetto lista appartamenti
});

module.exports = router;