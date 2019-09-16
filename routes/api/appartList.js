const express = require('express');
const router = new express.Router();
const appartModel = require('../../models/appartamentiModel');
const mongoose = require('mongoose');


// return json data of all appart with at least one room available
router.get('/', async (req,res) => {
    try {

        const today = new Date();
        result = await appartModel. aggregate([ {$unwind : "$rooms" } ,
                                                { $match : {  "$nor" : [ { "rooms.contracts" : { "$elemMatch" : { "$and" : [
                                                                        { "outDate" : { $gt : today } },
                                                                        { "inDate"  : { $lt : today } }  ] } } } ] } } 
                                                                   , { $group: {_id: null, uniqueId : { $addToSet: "$_id"}} }  
                                                                   , { $project : { "_id": 0 } }
                                                                    ]  );

        // get array of unique Id of mongoDB
        let arrayId = [];
        for (var key in result[0].uniqueId) {
              //  console.log(key + " -> " + result[0].uniqueId[key]);
                arrayId.push((new mongoose.mongo.ObjectId(result[0].uniqueId[key])) )
        }

        // find aparts with at least one room available
        const resultFinal = await appartModel.find({ "_id"  : { $in : arrayId  } });
        res.json(resultFinal);

    }
    catch(err) {

        res.status(400).send('err');
        
    }

 
});
module.exports = router;