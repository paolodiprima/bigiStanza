const express = require('express');
const router = new express.Router();
const roomModel = require('../../models/appartamentiModel');
const Joi = require('@hapi/joi');
const { schemaValidationContract } = require('../../models/validationModels');
const checkDate = require('../../middleware/midCheckDataContract');

 
// update contracts  from id room and contracts index
router.post('/:idroom', checkDate, async (req,res) => {

    //  input validation
    const resultValidation = Joi.validate( req.body,schemaValidationContract );
    if ( resultValidation.error ){
        res.status(400).send( resultValidation.error.details[0].message );
        return;
    } 
       
        try{
            let    roomId = req.params.idroom;
            let    name = req.body.HolderName ;
            let    surname =  req.body.HolderSurname;
            let    DoB =  req.body.HolderDoB;
            let    job =  req.body.HolderJob;
            let    sesso = req.body.sesso;
            let    inDate =  req.body.inDate;
            let    outDate =  req.body.outDate;
            let    indexContract = req.body.indexContract;
            indexContract = parseInt(indexContract) - 1;
           
            // update data contract
            let query = {"rooms._id" :  roomId} ;
           
            let update = `{ "rooms.$.contracts.${indexContract}.holderName" : "${name}",`;
            update = update + `"rooms.$.contracts.${indexContract}.holderSurname" : "${surname}",`;
            update = update + `"rooms.$.contracts.${indexContract}.holderJob" : "${job}",`;
            update = update + `"rooms.$.contracts.${indexContract}.holderDoB" :  "${DoB}",`;
            update = update + `"rooms.$.contracts.${indexContract}.sex" : "${sesso}",`;
            update = update + `"rooms.$.contracts.${indexContract}.inDate" : "${inDate}",`;
            update = update + `"rooms.$.contracts.${indexContract}.outDate" : "${outDate}" }`;

            // create query object
            let jsonUpdate = JSON.parse( update );
            
            result = await roomModel.findOneAndUpdate( query,jsonUpdate );
            res.send( result );
         }
         catch (err) {
             res.status( 400 ).send( err );
         }

});
module.exports = router;