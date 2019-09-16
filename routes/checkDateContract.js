const express = require('express');
const router = new express.Router();
const roomModel = require('../models/appartamentiModel');
const { rangeDateValidation } = require('../models/validationModels');
 
const stringToDate = function(dateString) {
    const [yyyy, mm , dd] = dateString.split("-");
    return new Date(`${yyyy}-${mm}-${dd}`);
  };

// check if range is valid, if yes continue new()
router.get('/:roomid', (req,res,next) => {

    async function checkDate() {

        let roomId = req.params.roomid;
        let newDateIn = stringToDate(req.body.inDate);
        let newDateOut = stringToDate(req.body.outDate);
       
        try {
            result = await roomModel.find({ "rooms": { $elemMatch: { _id: roomId } } }, { "rooms.contracts.$": 1, _id: 0 });
        
            const validRange = rangeDateValidation(newDateIn,newDateOut,result[0].rooms[0].contracts);

            if (validRange) next();
           
        }
        catch (error) {
            console.error(error);
            res.send('error', err);
        }
    }
    checkDate();  

});
module.exports = router;