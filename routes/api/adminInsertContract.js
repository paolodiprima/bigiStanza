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
            var    DoB =  req.body.HolderDoB;
            var    job =  req.body.HolderJob;
            var    inDate =  req.body.inDate;
            var    outDate =  req.body.outDate;
            var    indexContract = req.body.indexContract;
         //   indexContract = parseInt(indexContract) - 1;
           
            // insert contract
            
      
            // var query = {"rooms._id" :  roomId} ;
            // console.log("query: "+JSON.stringify(query)); 
           
            // var insertContract = `{ "rooms.$.contracts.${indexContract}.holderName" : "${name}",`;
            // update = update + `"rooms.$.contracts.${indexContract}.holderSurname" : "${surname}",`;
            // update = update + `"rooms.$.contracts.${indexContract}.holderJob" : "${job}",`;
            // update = update + `"rooms.$.contracts.${indexContract}.holderDoB" :  "${DoB}",`;
            // update = update + `"rooms.$.contracts.${indexContract}.inDate" : "${inDate}",`;
            // update = update + `"rooms.$.contracts.${indexContract}.outDate" : "${outDate}" }`;
            // console.log("update: " + update);
            // var jsonupdate = JSON.parse(update);
            
            result = await roomModel.findOneAndUpdate({"rooms._id":roomId},{$push: {"rooms.$.contracts":{"holderName":name,"holderSurname":surname,"holderDoB":DoB,"holderJob":job,"inDate":inDate,"outDate":outDate}}} );
            
            //console.log("result: "+JSON.stringify(result));
            res.send(result);
         }
         catch (error) {
            res.send('error',err);
         }
    }
    updateContract();  
});
module.exports = router;