const express = require('express');
const router = new express.Router();
const appartModel = require('../models/appartamentiModel');
const mongoose = require('mongoose');


router.get('/', async (req,res) => {

    // find appartmente with at least one room available


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
        const dataJSON = JSON.parse(JSON.stringify(resultFinal));
        res.render('home',{appartList:dataJSON});

    }
    catch(err) {
        console.log(err);
        res.status(400).send('err');
        
    }

    // const today = new Date();
    // appartModel.find({"rooms.contracts": {$elemMatch:{outDate :{$lt : today}}}})
    //     .then((data)=>{
            
    //         const dataJSON = JSON.parse(JSON.stringify(data));
    //         res.render('home',{appartList:dataJSON}); //pass obj list appartments
    //     })
    //     .catch((err)=>{
    //         console.log(err);
    //         res.send('error',err);
    //     });
});
module.exports = router;