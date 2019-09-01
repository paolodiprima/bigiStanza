const express = require('express');
const router = new express.Router();
const roomModel = require('../../models/appartamentiModel');
const Joi = require('@hapi/joi');
const { schemaValidationContract } = require('../../models/validationModels');
const checkDate = require('../../middleware/midCheckDataContract');

 
// update contracts  from id room and contracts index

router.post('/:idroom', checkDate, (req,res) => {

    //  input validation
  //  console.log(`name ${req.body.HolderName} -- surname : ${req.body.HolderSurname} -- nato : ${req.body.HolderDoB} -- job : ${req.body.HolderJob} -- sesso : ${req.body.sesso}`);
    const resultValidation = Joi.validate(req.body,schemaValidationContract);
    console.log('error result obj : ' + resultValidation.error);
    if (resultValidation.error){
        res.send(resultValidation.error.details[0].message);
        return;
    } 

    async function updateContract(){
        
        try{
            var    roomId = req.params.idroom;
            var    name = req.body.HolderName ;
            var    surname =  req.body.HolderSurname;
            var    DoB =  req.body.HolderDoB;
            var    job =  req.body.HolderJob;
            var    sesso = req.body.sesso;
            var    inDate =  req.body.inDate;
            var    outDate =  req.body.outDate;
            var    indexContract = req.body.indexContract;
            indexContract = parseInt(indexContract) - 1;
           
            // update data contract
            var query = {"rooms._id" :  roomId} ;
             
            var update = `{ "rooms.$.contracts.${indexContract}.holderName" : "${name}",`;
            update = update + `"rooms.$.contracts.${indexContract}.holderSurname" : "${surname}",`;
            update = update + `"rooms.$.contracts.${indexContract}.holderJob" : "${job}",`;
            update = update + `"rooms.$.contracts.${indexContract}.holderDoB" :  "${DoB}",`;
            update = update + `"rooms.$.contracts.${indexContract}.sex" : "${sesso}",`;
            update = update + `"rooms.$.contracts.${indexContract}.inDate" : "${inDate}",`;
            update = update + `"rooms.$.contracts.${indexContract}.outDate" : "${outDate}" }`;
            
            // create query object
            var jsonUpdate = JSON.parse(update);
            
            result = await roomModel.findOneAndUpdate(query,jsonUpdate);
            res.send(result);
         }
         catch (error) {
             console.error(error);
             res.send('error',err);
         }
    }
    updateContract();  
});
module.exports = router;