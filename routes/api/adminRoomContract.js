const express = require('express');
const router = new express.Router();
const appartModel = require('../../models/appartamentiModel');
var ObjectID = require("mongodb").ObjectID;

// return object room from room id
router.get('/:roomid', (req,res) => {

    var roomId = req.params.roomid;
 
    // find room by id
     appartModel.find({"rooms":{$elemMatch:{_id: roomId}}},{"rooms.contracts.$":1,_id:0} )
        .then((data)=>{
            res.send(data);  
        })
        .catch((err)=>{
            console.log("ERRORE",err);
            res.send('error',err);
        });

});
module.exports = router;