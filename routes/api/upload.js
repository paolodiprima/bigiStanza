const express = require('express');
const router = new express.Router();
const appartModel = require('../../models/appartamentiModel');
const multer = require('multer');
const path = require('path');



// set storage strategy
const myStorage = multer.diskStorage({
    destination: './public/img',
    filename: function(req,file,cb){
        cb(null,file.originalname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// init upload
const upload = multer({
    storage: myStorage,
    limits:{fileSize:1024*1024*5},
    fileFilter:function(req,file,cb){
        checkFileType(file,cb);
    },
}).single('image');

// check file type
function checkFileType(file,cb){
    //  allowed and check extention
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    //  check mime type
    const mimetype = filetypes.test(file.mimetype);
    console.log('mimetype: '+mimetype+'   extname: '+extname+ ' real mimetype: '+file.mimetype);
    if(mimetype && extname){
        return cb(null,true);
    }else{
        cb('Errore: il file non è un immagine');
    }
}

router.post('/',function(req,res){

    upload(req,res,(err) =>{
        console.log('nome file '+req.file.originalname);
        console.log('nome finale'+req.file.filename);
        console.log('appartID: '+req.body.appartId);
        console.log('roomID: ' +req.body.room);

        if(err) { 
            res.status(400).send (err );
        } else{
            if(req.file == undefined){
                res.send('Errore: nessun file selezionato');
            } else{
            // file correctly saved    
                
                if (req.body.room){
                    //  query insert img room in db mongo
                    appartModel.findOneAndUpdate({ _id: req.body.appartId, 'rooms._id': req.body.room }, 
                    { $push: { 'rooms.$.img': req.file.filename }})
                        .then((data)=>{
                        })
                        .catch((err)=>{
                        res.status(404).send(err);
                        });

                } else{ 
                   //  query insert img appart in db mongo
                    
                    appartModel.findOneAndUpdate({_id : req.body.appartId},{$push: { imgAppart: req.file.filename }},{new:true})
                        .then((data)=>{
                        })
                        .catch((err)=>{
                            res.status(404).send(err);
                        });
                }
       
                res.send('File uploaded');
            }  
        }     
   });     
});
module.exports = router;