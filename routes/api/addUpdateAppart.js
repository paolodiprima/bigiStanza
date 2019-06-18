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

            // insert array of rooms and append into the Model

            var objRoom = {};
            for (i=1;i<=parseInt(req.body.numRooms);i++) {
              
                var roomsize = "roomsize"+i;
                var price = "price"+i;
                var accesso = "accesso"+i;
               
                objRoom.size = req.body["roomsize"+i];
                objRoom.price = req.body["price"+i];
                objRoom.extAccess = req.body["accesso"+i];
                newAppart.rooms[i-1] = objRoom;
            }

            const result = await newAppart.save();
            var id = result._id;
            //console.log("result id = "+id);

            res.send(result);
            
        }
        catch (error) {
            console.error(error);
            res.send('error',err);
        }
    }
  addAppart();   
});

router.post('/:idappart', (req,res) => {

    async function updateAppart(){
        try{
            
            var    idappart = req.body.appartid;
            var    internalName = req.body.internalName ;
            var    address =  req.body.address;
            var    cap =  req.body.cap;
            var    floor =  req.body.floor;
            var    numRooms =  req.body.numRooms;
            var    numBathRooms =  req.body.numBathrooms;
            var    appartSize =  req.body.appartsize;
            var    services =  req.body.services;
            var    description =  req.body.description;
                        
            // update data appartment

            var result = await newAppartModel.findOneAndUpdate({"_id" : idappart},{$set : { "description":description}});  
            
            // update data rooms
            // one update for each room
                        
            for (var i=0;i<parseInt(req.body.numRooms);i++) {
                var roomsize = req.body["roomsize"+(i+1)];
                var price = req.body["price"+(i+1)];
                var accesso = req.body["accesso"+(i+1)];
                var query = `{"_id" : "${idappart}"}`;
                var jsonquery = JSON.parse(query);
                var update = `{ "rooms.${i}.size": ${roomsize},"rooms.${i}.price":${price},"rooms.${i}.extAccess":"${accesso}"}`;
                var jsonupdate = JSON.parse(update);
              // var result = await newAppartModel.findOneAndUpdate({"_id" : idappart}, {$set: { "rooms.0.size":roomsize,"rooms.0.price":price,"rooms.0.extAccess":accesso}});
              //  console.log("query"+query);
              //  console.log("update"+update);
                result = await newAppartModel.findOneAndUpdate(jsonquery,jsonupdate);
            }
            res.send(result);
           
         }
         catch (error) {
             console.error(error);
             res.send('error',err);
         }
    }
    updateAppart();  
});
module.exports = router;
    

