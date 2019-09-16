const express = require('express');
const router = new express.Router();
const mongoose = require('mongoose');
const appartModel = require('../models/appartamentiModel');

router.get('/:appartid', (req,res) => {

    var id = req.params.appartid;
    
    // find apparment that refer to room selected
    appartModel.findById(id)
    .then((data)=>{
        const today = new Date();
        let libere = 0;
        for (var j=0; j < data.rooms.length; j++ ){  // per quante stanze in un appartamento
                 
            for (var l=0; l < data.rooms[j].contracts.length; l++){ // per quanti contratti di una stanza
         
               
               // if today there is a valid contract, insert data into the array
                if ((today < data.rooms[j].contracts[l].outDate)  && (today > data.rooms[j].contracts[l].inDate))  {
                    data.rooms[j].contracts = [data.rooms[j].contracts[l]];
                    continue;
              
                }
                // if arrive at the end of the array, the room is available
                if (l == data.rooms[j].contracts.length -1 ) {
                    data.rooms[j].contracts = [];
                    libere++;
                } 
            }
        }
        occupanti = data.rooms.length - libere;

       const dataJSON = JSON.parse(JSON.stringify(data));
       res.render('stanze',{appart:dataJSON,occupanti:occupanti});

    })
        .catch((err)=>{
        console.log("ERRORE",err);
        res.status(404).send(err);
    });

});

module.exports = router;
