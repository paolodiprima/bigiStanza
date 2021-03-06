const express = require('express');
const router = new express.Router();
const roomModel = require('../../models/appartamentiModel');
const Joi = require('@hapi/joi');
const { schemaValidationContract } = require('../../models/validationModels');
const checkDate = require('../../middleware/midCheckDataContract');

// add  contracts  from id room and contracts index

router.post('/:idroom',checkDate, (req,res) => {

    //  input validation
    const resultValidation = Joi.validate(req.body,schemaValidationContract);
    if (resultValidation.error){
        res.status(400).send(resultValidation.error.details[0].message);
        return;
    } 
    
    async function insertContract(){
        
        try{
            var    roomId = req.params.idroom;
            var    name = req.body.HolderName ;
            var    surname =  req.body.HolderSurname;
            var    DoB =  req.body.HolderDoB;
            var    job =  req.body.HolderJob;
            var    inDate =  req.body.inDate;
            var    outDate =  req.body.outDate;
            var    sesso = req.body.sesso;
            var    indexContract = req.body.indexContract;

            result = await roomModel.findOneAndUpdate({"rooms._id":roomId},
                                                      {$push: {"rooms.$.contracts":{"holderName":name,"holderSurname":surname,"holderDoB":DoB,"sex":sesso,"holderJob":job,"inDate":inDate,"outDate":outDate}}} );
            
            res.send(result);
         }
         catch (error) {
            res.status(400).send(err);
         }
    }
    insertContract();  
});
module.exports = router;