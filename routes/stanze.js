const express = require('express');
const router = new express.Router();
const mongoose = require('mongoose');
const appartModel = require('../models/appartamentiModel');

var uri2 = "mongodb://paoloDemoAtlas:***REMOVED***@cluster0-shard-00-00-0ega5.azure.mongodb.net:27017,cluster0-shard-00-01-0ega5.azure.mongodb.net:27017,cluster0-shard-00-02-0ega5.azure.mongodb.net:27017/BGStanza?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true"
var uri = "mongodb+srv://paoloDemoAtlas:***REMOVED***@cluster0-0ega5.azure.mongodb.net/BGStanza?retryWrites=true"

mongoose.connect(uri2,function(err){
   
    if (err) {
    console.log ('ERROR connecting to: ' + uri + '. ' + err);
    } else {
    console.log ('Succeeded connected to: ' + uri); 
    }
  });


router.get('/:appartid', (req,res) => {


    const today = new Date();
 //   var query = "{'id': ObjectId('+"req.params.appartid"+')})";
  

    var id = req.params.appartid;
    console.log(id);
    
    appartModel.findById(id)
        .then((data)=>{
            
            const dataJSON = JSON.parse(JSON.stringify(data));
            console.log(dataJSON);
            res.render('stanze',{appart:dataJSON}); //passo oggetto lista appartamento
          //  res.json(data);
        })
        .catch((err)=>{
            console.log("ERRORE",err);
            res.send('error',err);
        });

});
module.exports = router;