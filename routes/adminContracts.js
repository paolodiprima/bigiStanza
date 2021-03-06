const express = require('express');
const router = new express.Router();
const checkAuth = require('../middleware/checkAuth');
const appartModel = require('../models/appartamentiModel');

function convertDate(date){
    month = ['gen','feb','mar','apr','mag','giu','lug','ago','set','ott','nov','dic'];
    return   date.getDate() + ' ' + month[date.getMonth()]+ ' ' + date.getFullYear()
}

router.get('/',checkAuth, (req,res) => {

    appartModel.find({},{"internalName":1, "rooms":1   }).sort({ internalName : 1})
    .then((data)=>{
        const today = new Date();
     //   console.log('numero appartamenti ' + data.length);
        for (var i =0; i < data.length ; i++){  // per quanti appartamenti ci sono
        
             for (var j=0; j < data[i].rooms.length; j++ ){  // per quante stanze in un appartamento
                 
                 for (var l=0; l < data[i].rooms[j].contracts.length; l++){ // per quanti contratti di una stanza
              
                    
                    // if today there is a valid contract, insert data into the array
                     if ((today < data[i].rooms[j].contracts[l].outDate)  && (today > data[i].rooms[j].contracts[l].inDate))  {
                         data[i].rooms[j].contracts[l].outDateF = convertDate( data[i].rooms[j].contracts[l].outDate) ;
                         data[i].rooms[j].contracts[l].inDateF = convertDate(data[i].rooms[j].contracts[l].inDate);
                         data[i].rooms[j].contracts = [data[i].rooms[j].contracts[l]];
                         continue;
                   
                     }
                     // if arrive at the end of the array, the room is available
                     if (l == data[i].rooms[j].contracts.length -1 ) data[i].rooms[j].contracts = [];
                 }
             }
        }
       // res.json(data);
       res.render('contracts',{appartRoomList:data, user:req.session.userName}); 
        })
    .catch((err)=>{
        console.log(err);
        res.send('error');
    });

    
});
module.exports = router;