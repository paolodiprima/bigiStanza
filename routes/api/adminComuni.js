// api that returns json data comuni having containing keyWord  in the name

const express = require('express');
const router = new express.Router();
const comuniModel = require('../../models/comuniModel');

router.get('/', (req, res) => {
    // if undefined return []
    var jsonGetComuni = {};
    if ( (typeof req.query.q != undefined)) {
        
        // define query and create query object
        let getComuni = `{ "Comune": { "$regex" : "${req.query.q}", "$options": "i" } }`
        jsonGetComuni = JSON.parse(getComuni);
    } 
    comuniModel.find(jsonGetComuni)
        .then((data) => {
            obj = {};
            
            var result = [];
            // transform result for Select2
           
            for (let i=0; i<data.length;i++){
                result.push({id: data[i].cap+"" ,"text": data[i].Comune});
            }
            obj.results = result;
            res.send(obj);
        })
        .catch((err) => {
            console.log('ERRORE:');
            console.log(err);
            res.send('error');
        });
    
});
module.exports = router;