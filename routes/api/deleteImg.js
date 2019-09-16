const express = require('express');
const router = new express.Router();
const appartModel = require('../../models/appartamentiModel');
const path = require('path');
const fs = require('fs');

// remove img phisically and from database
 
// phisical cancellation
function removeFile(nameImg){
    var fileName = path.resolve(__dirname);
    var pathArray = fileName.split('/');
    pathArray.splice(pathArray.length - 2,2);
    fileName = pathArray.join('/') + "/public/img/" + nameImg;
    fs.unlinkSync(fileName);    
}

router.post('/', (req,res) => {
   
    var appartId = req.body.appartId;
    var roomId = req.body.roomId;
    var nameImg = req.body.nameImg;
    
    

    if (!roomId){
    
        // remove link image appart from db
        appartModel.findOneAndUpdate({_id:appartId},{ $pull: { imgAppart: nameImg }},{new:true})
            .then((data)=>{
                const dataJSON = JSON.parse(JSON.stringify(data));
                removeFile(nameImg);
                res.json(data);
            })
            .catch((err)=>{
                res.status(404).send(err);
            });
        
    } else {
       
        // remove link image room from db
        appartModel.findOneAndUpdate({ _id: appartId, 'rooms._id': roomId }, 
                                    { $pull: { 'rooms.$.img': nameImg }})
            .then((data)=>{
                const dataJSON = JSON.parse(JSON.stringify(data));
                removeFile(nameImg);
                res.json(data);
            })
            .catch((err)=>{
                res.status(404).send(err);
            });
    }
//res.send('ok');
});
module.exports = router;