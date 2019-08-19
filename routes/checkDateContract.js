const express = require('express');
const router = new express.Router();
const roomModel = require('../models/appartamentiModel');
const { rangeDateValidation } = require('../models/validationModels');
 
const stringToDate = function(dateString) {
    const [yyyy, mm , dd] = dateString.split("-");
    return new Date(`${yyyy}-${mm}-${dd}`);
  };

// return object room from room id
router.get('/:roomid', (req,res,next) => {

    async function checkDate() {

        let roomId = req.params.roomid;
        let newDateIn = stringToDate(req.body.inDate);
        let newDateOut = stringToDate(req.body.outDate);
        //let validRange = true;

        try {
            result = await roomModel.find({ "rooms": { $elemMatch: { _id: roomId } } }, { "rooms.contracts.$": 1, _id: 0 });
           
           
            const validRange = rangeDateValidation(newDateIn,newDateOut,result[0].rooms[0].contracts);

            // for (let i=0 ; i< parseInt(result[0].rooms[0].contracts.length);i++){
               
            //     if (newDateIn > result[0].rooms[0].contracts[i].outDate)
            //         continue;
            //      else if  (newDateOut <  result[0].rooms[0].contracts[i].inDate)
            //         continue;
            //          else {
            //                 validRange = false;
            //                 break;
            //         }
            // } // for



            if (validRange) console.log('VALIDA')
            else console.log('NON VALIDA');

            if (validRange) next();
          //  res.send(result[0].rooms[0].contracts);
        }
        catch (error) {
            console.error(error);
            res.send('error', err);
        }
    }
    checkDate();  

});
module.exports = router;