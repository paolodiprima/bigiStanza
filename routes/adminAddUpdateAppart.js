const express = require('express');
const router = new express.Router();
 const mongoose = require('mongoose');
 const adminAppartModel = require('../models/appartamentiModel');

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


// appartment data mangement in mode update = true
router.get('/:appartid', (req,res) => {

  var id = req.params.appartid;
    
  adminAppartModel.findById(id)
      .then((data)=>{
          data.update = true;
          const dataJSON = JSON.parse(JSON.stringify(data));
          
          //console.log("DENTRO RENDER DI adminAddUpdateAppart UPDATE");
          res.render('adminAddUpdateAppart',{appart:dataJSON}); //append object appartment list
        
      })
      .catch((err)=>{
          console.log("ERRORE",err);
          res.send('error',err);
      });

});

// appartment data mangement in mode update = false
router.get('/', (req,res) => {
  // console.log("DENTRO RENDER DI adminAddUpdateAppart INSERT");
  res.render('adminAddUpdateAppart');
});
module.exports = router;