const express = require('express');
const router = new express.Router();
const roomModel = require('../../models/appartamentiModel');

// update contracts  from id room and contracts index

router.post('/:idroom', (req,res) => {

    async function updateContract(){
        
        try{
            var    roomId = req.params.idroom;
            var    name = req.body.HolderName ;
            var    surname =  req.body.HolderSurname;
           // var    DoB =  new Date(req.body.HolderDoB);
            var    DoB =  req.body.HolderDoB;
            var    job =  req.body.HolderJob;
            var    inDate =  req.body.inDate;
            var    outDate =  req.body.outDate;
            var    indexContract = req.body.indexContract;
            indexContract = parseInt(indexContract) - 1;
           
            // update data contract
            
            var query = {"rooms._id" :  roomId} ;
            //console.log("query: "+JSON.stringify(query)); 
            var update = `{ "rooms.$.contracts.${indexContract}.holderName" : "${name}",`;
            update = update + `"rooms.$.contracts.${indexContract}.holderSurname" : "${surname}",`;
            update = update + `"rooms.$.contracts.${indexContract}.holderJob" : "${job}",`;
            update = update + `"rooms.$.contracts.${indexContract}.holderDoB" :  "${DoB}",`;
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