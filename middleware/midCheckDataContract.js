const roomModel = require('../models/appartamentiModel');
const { rangeDateValidation } = require('../models/validationModels');
 

module.exports = function  (req,res,next)  {
    
    async function checkDate() {
        
        const stringToDate = function (dateString) {
            const [yyyy, mm, dd] = dateString.split("-");
            return new Date(`${yyyy}-${mm}-${dd}`);
        };

        let roomId = req.params.idroom;
        let newDateIn = stringToDate(req.body.inDate);
        let newDateOut = stringToDate(req.body.outDate);
        
        console.log('sto usando middleware');

        try {
            result = await roomModel.find({ "rooms": { $elemMatch: { _id: roomId } } }, { "rooms.contracts.$": 1, _id: 0 });
            
            // if operation = update remove current contract from check
            if (req.body.indexContract)  result[0].rooms[0].contracts.splice((parseInt(req.body.indexContract))-1,1)
            else console.log('faccio inserimento');
           
           
            const validRange = rangeDateValidation(newDateIn, newDateOut, result[0].rooms[0].contracts);
            

            if (validRange) console.log('VALIDA')
            else console.log('NON VALIDA');
            console.log('validRange : ' + validRange);
            if (validRange) next()
            else res.send('errore: periodo richiesto non disponibile...');

        }
        catch (error) {
            console.error(error);
            res.send('error', err);
        }
    }
    checkDate();

  }

 