const express = require('express');
const router = new express.Router();
const appartModel = require('../../models/appartamentiModel');


// return json data of all appart with at least one room available
router.get('/', async (req,res) => {
    try {

        const today = new Date();
        result = await appartModel. aggregate([ {$unwind : "$rooms" } ,
                                                { $match : {  "$nor" : [ { "rooms.contracts" : { "$elemMatch" : { "$and" : [
                                                                        { "outDate" : { $gt : today } },
                                                                        { "inDate"  : { $lt : today } }  ] } } } ] } } ,
                                                { $project : { "_id" : 1  } } ]  );
        let uniqueRoomId = []
        for (let i=0 ; i < result.length ; i++ ){
          
            console.log("check : " +uniqueRoomId.indexOf(result[i]._id) );
            if (uniqueRoomId.indexOf(result[i]._id+"") == -1) uniqueRoomId.push(result[i]._id+"");
        }
 
        var query = ` [ ObjectId("${uniqueRoomId[0]}"), ObjectId("${uniqueRoomId[1]}")]`;
        
        var mongoose = require('mongoose');
        var Id1 = new mongoose.mongo.ObjectId('5c229868856a3e000053299d');
        var Id2 = new mongoose.mongo.ObjectId('5d09e780c73bcc002a7f9fcf');
     
       // dovrebbe funzionare anche la prima query, basta mettere id stanze diversi
   
    
        const result2 = await appartModel.find({ "rooms._id"  : { $in : [ Id1, Id2] } });
        res.json(result2);

    }
    catch(err) {
        res.status(400).send('error');
        
    }

 
});
module.exports = router;