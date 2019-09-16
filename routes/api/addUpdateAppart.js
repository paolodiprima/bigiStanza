// routers to add or update an appartment's data
const express = require('express');
const router = new express.Router();
const newAppartModel = require('../../models/appartamentiModel');
const Joi = require('@hapi/joi');
const  { schemaValidationAppart } = require('../../models/validationModels');

// add appartment
router.put('/', (req,res) => {

    //  input validation
    const resultValidation = Joi.validate(req.body,schemaValidationAppart);
    if (resultValidation.error){
        res.send(resultValidation.error.details[0].message);
        return;
    } 

    async function addAppart(){
        try{
            const newAppart = new newAppartModel({
                internalName : req.body.internalName ,
                address : req.body.address,
                city: req.body.city,
                cap : req.body.cap,
                floor : req.body.floor,
                numRooms : req.body.numRooms,
                numBathRooms : req.body.numBathrooms,
                appartSize : req.body.appartsize,
                services : req.body.services,
                description : req.body.description.trim(),
                rooms : []
            });

            // insert array of rooms and append into the Model
            for (i=1;i<=parseInt(req.body.numRooms);i++) {
                let objRoom = {};
                objRoom.size = req.body["roomsize"+i];
                objRoom.price = req.body["price"+i];
                objRoom.extAccess = req.body["accesso"+i];
                newAppart.rooms[i-1] = objRoom;
                
            }

            const result = await newAppart.save();
            res.send(result);
            
        }
        catch (error) {
            console.error(error);
            res.send('error',err);
        }
    }
  addAppart();   
});



// update appart
router.post('/:idappart', (req,res) => {
    
    //  input validation
    const resultValidation = Joi.validate(req.body,schemaValidationAppart);
    if (resultValidation.error){
        res.send(resultValidation.error.details[0].message);
        return;
    } 

    async function updateAppart(){
        try{
            
            var    idappart = req.body.appartid;
            var    internalName = req.body.internalName ;
            var    address =  req.body.address;
            var    city = req.body.city;
            var    cap =  req.body.cap;
            var    floor =  req.body.floor;
            var    numRooms =  req.body.numRooms;
            var    numBathRooms =  req.body.numBathrooms;
            var    appartSize =  req.body.appartsize;
            var    services =  req.body.services;
            var    description =  req.body.description;
            description = description.trim();
              
            // update data appartment
            
            var result = await newAppartModel.findOneAndUpdate({"_id" : idappart},{$set : { "internalName": internalName, 
                                                                                            "address": address, 
                                                                                            "city": city,
                                                                                            "cap": cap,
                                                                                            "floor" : floor,
                                                                                            "appartSize" : appartSize ,
                                                                                            "numBathRooms": numBathRooms,
                                                                                            "services": services,
                                                                                            "description":description}});  
            
            // update data rooms
            // one update for each room
                  
            for (var i=0;i<parseInt(numRooms);i++) {
                
                var roomsize = req.body["roomsize"+(i+1)];
                var price = req.body["price"+(i+1)];
                var accesso = req.body["accesso"+(i+1)];
                var descrRoom = req.body["descriptionRoom"+(i+1)];
                descrRoom = descrRoom.trim();
                var query = `{"_id" : "${idappart}"}`;
                var jsonquery = JSON.parse(query);
                var update = `{ "rooms.${i}.size": ${roomsize},"rooms.${i}.price":${price},"rooms.${i}.extAccess":"${accesso}","rooms.${i}.descrStanza":"${descrRoom}" }`;
                var jsonupdate = JSON.parse(update);
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
    

