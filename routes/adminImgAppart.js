const express = require('express');
const router = new express.Router();
const checkAuth = require('../middleware/checkAuth');
const appartModel = require('../models/appartamentiModel');

router.get('/:appartid',checkAuth, (req,res) => {

    var id = req.params.appartid;
    
     appartModel.findById(id)
        .then((data)=>{
            
            const dataJSON = JSON.parse(JSON.stringify(data));
            res.render('adminImgAppart',{appart:dataJSON}); //pass obj with appartmes selected
          
        })
        .catch((err)=>{
            
            res.send('error',err);
        });

});
module.exports = router;