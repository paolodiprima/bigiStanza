const express = require('express');
const router = new express.Router();
const mongoose = require('mongoose');
const appartModel = require('../../models/appartamentiModel');
const path = require('path');
const fs = require('fs');

var uri2 = "mongodb://paoloDemoAtlas:***REMOVED***@cluster0-shard-00-00-0ega5.azure.mongodb.net:27017,cluster0-shard-00-01-0ega5.azure.mongodb.net:27017,cluster0-shard-00-02-0ega5.azure.mongodb.net:27017/BGStanza?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true"
var uri = "mongodb+srv://paoloDemoAtlas:***REMOVED***@cluster0-0ega5.azure.mongodb.net/BGStanza?retryWrites=true"

mongoose.connect(uri2,function(err){
   
    if (err) {
    console.log ('ERROR connecting to: ' + uri + '. ' + err);
    } else {
    console.log ('Succeeded connected to: ' + uri); 
    }
  });
 
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
    
    removeFile(nameImg);

    if (!roomId){
    
        // remove link image appart from db
        appartModel.findOneAndUpdate({_id:appartId},{ $pull: { imgAppart: nameImg }},{new:true})
            .then((data)=>{
                const dataJSON = JSON.parse(JSON.stringify(data));
              //  fs.unlinkSync(fileName);
                res.json(data);
            })
            .catch((err)=>{
                res.status(404).send(err);
            });
        
    } else {
        // console.log("dentro cancellazione file immagine1");
        // remove link image room from db
        appartModel.findOneAndUpdate({ _id: appartId, 'rooms._id': roomId }, 
                                    { $pull: { 'rooms.$.img': nameImg }})
            .then((data)=>{
                const dataJSON = JSON.parse(JSON.stringify(data));
             //   fs.unlinkSync(fileName);
                res.json(data);
            })
            .catch((err)=>{
                res.status(404).send(err);
            });
    }
//res.send('ok');
});
module.exports = router;