const express = require('express');
const router = new express.Router();
const mongoose = require('mongoose');
const appartModel = require('../../models/appartamentiModel');

// return json data of all appartments interna name 
// addr 
router.get('/', (req,res) => {
    
    appartModel.find({},{"internalName":1, "rooms":1   })
        .then((data)=>{
            // costruire oggetto con internal name
            // e stanze solo se rispettano condizione di contratto attivo
            const today = new Date();

            for (var i =0; i < data.length ; i++){  // per quanti appartamenti ci sono
                for (var j=0; j < data[i].rooms.length; j++ ){  // per quante stanze in un appartamento
                    for (var l=0; l < data[i].rooms[j].contracts.length; l++){ // per quanti contratti in una stanza
                        console.log("checkOut : "+data[i].rooms[j].contracts[l].outDate);
                        if (today > data[i].rooms[j].contracts[l].outDate ){
                            data[i].rooms[j].contracts.splice(l,1);
                        }
                    }
                }
            }
        res.json(data);
        })
        .catch((err)=>{
        console.log(err);
        res.send('error');
        });

});
module.exports = router;