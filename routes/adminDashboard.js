const express = require('express');
const router = new express.Router();
const appartModel = require('../models/appartamentiModel');
const infoRequestModel = require('../models/infoRequestModel');

// api that returns json data of all appart having
// at least one room available today

router.get('/dashboard', async (req,res) => {
   
    try {
        
        const today = new Date();
        const afterOneMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDay());
        const afterTreeMonth = new Date(today.getFullYear(), today.getMonth() + 3, today.getDay());
        const cutOff = new Date(today.getFullYear(), today.getMonth() - 2, 1);
         
        
        const numberOfRooms = await appartModel.aggregate([ {$unwind : "$rooms" } ,{ $count : "total_rooms" } ] );
        
        const roomsAvailable = await appartModel.aggregate([ {$unwind : "$rooms" } ,
                                                             { $match : {  "$nor" : [ { "rooms.contracts" : { "$elemMatch" : { "$and" : [
                                                                                                                             { "outDate" : { $gt : today } },
                                                                                                                             { "inDate"  : { $lt : today } }  ] } } } ] } } ,
                                                             { $count : "rooms_Available" } ]  );
                                                              
        const revenueCurrentMonth = await appartModel.aggregate([ {$unwind : "$rooms" } , { $match : { "rooms.contracts" : { "$elemMatch" : { "$and" : [
                                                                                                                                            { "outDate" : { $gt : today } },
                                                                                                                                            { "inDate"  : { $lt : today } }  ] }  } }  },
                                                                                          { $group : { _id : '' , "tot" : { $sum : "$rooms.price" } } } ]  );
        
        const outInOneMonth = await appartModel.aggregate( [ {$unwind : "$rooms" } ,
                                                             { $match : {   "rooms.contracts" : { "$elemMatch" : { "$and" : [
                                                                        { "outDate" : { $gt : today } },
                                                                        { "inDate"  : { $lt : today } },
                                                                        { "outDate" : { $lt : afterOneMonth } } ] }   } } },
                                                             { $project : { "rooms.contracts.outDate" : 1 }},
                                                             { $count : "in_Scadenza_1m" } ] );

        
        const outInThreeMonth = await appartModel.aggregate( [ {$unwind : "$rooms" } ,
                                                             { $match : {   "rooms.contracts" : { "$elemMatch" : { "$and" : [
                                                                     { "outDate" : { $gt : today } },
                                                                     { "inDate"  : { $lt : today } },
                                                                     { "outDate" : { $lt : afterTreeMonth } } ] }   } } },
                                                             { $project : { "rooms.contracts.outDate" : 1 }},
                                                             { $count : "in_Scadenza_3m" } ] );
        
        const dataChart = await infoRequestModel.aggregate([  { $match : { "date" : { $gt : cutOff } } } ,
                                                              { $group : { _id: { month : { $month :  "$date"}},
                                                                    count : { $sum: 1 } }
                        
                                                               } ] );
          
        let inOneMonth = 0;                                                      
        let inTreeMonth = 0;                                                      
        if (outInOneMonth.length > 0) 
             inOneMonth = outInOneMonth[0].in_Scadenza_1m;
        if (outInThreeMonth.length > 0)
             inTreeMonth = outInThreeMonth[0].in_Scadenza_3m;
        const currentRevenue = revenueCurrentMonth[0].tot;
        const rooms_busy = parseInt(numberOfRooms[0].total_rooms) - roomsAvailable[0].rooms_Available ;
        const ratio_Occupied = Math.round(((parseFloat(rooms_busy)/(numberOfRooms[0].total_rooms)))*100) + "%" ;
        const ratio_Available =  Math.round(parseFloat(roomsAvailable[0].rooms_Available)/(numberOfRooms[0].total_rooms)*100) + "%" ;
        
        res.render('dashboard',{ "rooms" : numberOfRooms[0].total_rooms , 
                                 "rooms_available" : roomsAvailable[0].rooms_Available, 
                                 "rooms_busy" : rooms_busy, 
                                 "ratio" :ratio_Occupied, 
                                 "ratio_available" : ratio_Available,
                                 "revenue" : currentRevenue,
                                 "inOneMonth" : inOneMonth,
                                 "inTreeMonth": inTreeMonth,
                                 "month_2": dataChart[0].count ,
                                 "month_1" : dataChart[1].count,
                                 "month_0": dataChart[2].count,
                                 "user" : req.session.userName
                             });

    }
    catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
 
});
module.exports = router;

