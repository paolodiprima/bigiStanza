const express = require('express');
const router = new express.Router();
const mongoose = require('mongoose');
const newAppartModel = require('../../models/appartamentiModel');

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

    async function addAppart(){
        try{
            const newAppart = new newAppartModel({
                internalName : req.body.internalName ,
                address : req.body.address,
                cap : req.body.cap,
                floor : req.body.floor,
                numRooms : req.body.numRooms,
                numBathRooms : req.body.numBathrooms,
                appartSize : req.body.appartsize,
                services : req.body.services,
                description : req.body.description,
                rooms : []
            });
            var objRoom = {};
            for (i=1;i<=parseInt(req.body.numRooms);i++) {
              
                var roomsize = "roomsize"+i;
                var price = "price"+i;
                var accesso = "accesso"+i;
               
                objRoom.size = req.body["roomsize"+i];
                objRoom.price = req.body["price"+i];
                objRoom.accesso = req.body["accesso"+i];
                newAppart.rooms[i-1] = objRoom;
            }

            const result = await newAppart.save();
            var id = result._id;
            console.log("result id = "+id);

            res.send(result);
             mongoose.connection.close();
        }
        catch (error) {
            console.error(error);
            res.send('error',err);
        }
    }
  addAppart();   
  

});

module.exports = router;
    

