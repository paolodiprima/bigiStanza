const express = require('express');
const router = new express.Router();
const appartModel = require('../models/appartamentiModel');


router.get('/', (req,res) => {

    // find appartmente with at least one room available
    const today = new Date();
    appartModel.find({"rooms.contracts": {$elemMatch:{outDate :{$lt : today}}}})
        .then((data)=>{
            
            const dataJSON = JSON.parse(JSON.stringify(data));
            res.render('index',{appartList:dataJSON}); //pass obj list appartments
        })
        .catch((err)=>{
            console.log(err);
            res.send('error',err);
        });
});
module.exports = router;